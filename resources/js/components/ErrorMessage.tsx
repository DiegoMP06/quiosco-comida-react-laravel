import { PropsWithChildren } from "react";


export default function ErrorMessage({ children }: PropsWithChildren) {
    return (
        <p className="text-red-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-red-700 bg-red-200 rounded">{children}</p>
    )
}
