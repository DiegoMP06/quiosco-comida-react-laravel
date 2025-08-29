import { PropsWithChildren } from "react";

export default function SuccessMessage({children}: PropsWithChildren) {
    return (
        <p className="text-green-700 font-bold text-sm uppercase py-2 pl-4 pr-10 border-l-4 border-green-700 bg-green-200 rounded">{children}</p>
    )
}
