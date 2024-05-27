export default function useMessageSegment<T extends string>(segmentObj: Record<T, string>, pattern: string) {
  return (key: keyof typeof segmentObj, value?: string) => value ? segmentObj[key].replace(pattern, value) : segmentObj[key];
}