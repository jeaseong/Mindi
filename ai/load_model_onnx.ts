import { Tensor, InferenceSession } from "onnxjs";

async function loadModel() {
    const session = new InferenceSession();

    const url = "./model/onnx/model.onnx";
    await session.loadModel(url)

    const x = new Float32Array(3 * 4 * 5).fill(1);
    const y = new Float32Array(3 * 4 * 5).fill(2);

    const inputs = [ x, y ];

    const outputMap = await session.run(inputs);
    const outputTensor = outputMap.values().next().value;
    console.log(outputTensor)
} 

loadModel()
