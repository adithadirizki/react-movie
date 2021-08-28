export default function SkeletonPreload() {
  let element = [];
  for (let i = 0; i < 20; i++) {
    element.push(
      <div className="animate-pulse flex flex-col" key={i}>
        <div className="rounded-t-md bg-gray-200 h-64 w-full mx-auto"></div>
        <div className="space-y-2 py-2">
          <div className="h-4 bg-gray-200 w-11/12"></div>
          <div className="h-4 bg-gray-200 w-1/2"></div>
          <div className="h-4 bg-gray-200 w-4/5"></div>
        </div>
      </div>
    );
  }
  return element;
}
