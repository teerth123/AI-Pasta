interface MessageProps {
  prompt: string;
  output: string;
  modelUsed:string
}

export default function Message({ prompt, output, modelUsed }: MessageProps) {
  return (
    <>
      <div className="w-full h-fit border border-b border-[#3b3b3b]">
        <div className="">
            <p className="text-gray-500 text-sm text-left">you</p>
          <p className="text-white w-96 text-right">{prompt}</p>
        </div>
        <div className="">
            <p className="text-gray-500 text-sm text-left">Agent({modelUsed})</p>
        <p className="text-white w-96 text-left">{output}</p>
        </div>
      </div>
    </>
  );
}
