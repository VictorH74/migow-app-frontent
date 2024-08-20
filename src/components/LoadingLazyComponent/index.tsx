import Loading from "../Loading";

export default function LoadingLazyComponent() {
    return (
        <div className="fixed bottom-4 left-4 animate-spin size-fit">
            <Loading height={50} width={50} />
        </div>
    )
}