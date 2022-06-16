import { spawn } from 'child_process';

const diary =
  '정해진 시간을 지키지 못해서 속상했다.\n나는 왜 이럴까 매번.\n\n 정신을 차리자 제발. 영화는 재밌었다.';

function predict(diary: string) {
  const result = spawn('python3', ['predict_sentence.py', diary]);

  result.stdout.on('data', (data) => {
    const result = data.toString().split('\n').slice(0, -1);
    console.log('result:', result);
  });

  result.stderr.on('data', (data) => {
    console.log(data.toString());
  });
}

predict(diary);
