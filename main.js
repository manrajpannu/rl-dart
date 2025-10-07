async function main() {
    const adapter = await navigator?.gpu.requestAdapter();
    const device = await adapter?.requestDevice();

    if (!device) {
        fail("This browser does not support Web Gpu");
        return;
    }
    
    const module = device.createShaderModule({
        label: 'doubling compute module',
        code: /* wgsl */ `
            @group(0) @binding(0) var<storage, read_write> data: array<f32>;

            @compute @workgroup_size(2) fn computeSomething(
            @builtin(global_invocation_id) id: vec3u
            ) {
            let i = id.x;
            data[i] = sqrt(data[i]);
            }
        `
    });

    const pipeline = device.createComputePipeline({
        label: 'doubling compute pipeline',
        layout: 'auto',
        compute: {
            module,
        },
    });

    const input = new Float32Array(Array(65535));
    for (let i = 0; i < input.length; i++) {
        input[i] = Math.random() * 100;
    }

    console.log(input)
    
    // create a buffer to store the input data and the work buffer
    const workBuffer = device.createBuffer({
        label: 'work buffer',
        size: input.byteLength, 
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(workBuffer, 0, input);

    // create a buffer to store the result
    const resultBuffer = device.createBuffer({
        label: 'result buffer',
        size: input.byteLength,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
    });

    // create a bind group to bind the work buffer to the pipeline so the shader can access it.
    // bind group is like a bridge between the shader and the buffer
    const bindGroup = device.createBindGroup({
        label: 'bind group for work buffer',
        layout: pipeline.getBindGroupLayout(0),
        entries: [{binding: 0, resource: {buffer: workBuffer}}]
    });


    // create a command encoder to create the compute pass, now we can do the work on the gpu
    // notebook where we will write down all the gpu commands we want to do
    const encoder = device.createCommandEncoder({
        label: 'doubling encoder',

    });

    // starts the compute pass, which is like a section in the command encoder, where we can do compute work
    const pass = encoder.beginComputePass({
        label: 'doubling compute pass'
    });
    //


    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(input.length);
    pass.end();

    encoder.copyBufferToBuffer(workBuffer, 0, resultBuffer, 0, resultBuffer.size);

    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);

    await resultBuffer.mapAsync(GPUMapMode.READ);
    const result = new Float32Array(resultBuffer.getMappedRange());

    console.log(result);
    resultBuffer.unmap()
}

function fail(msg) {
  // eslint-disable-next-line no-alert
  alert(msg);
}

main();
  