import Image from "next/image";

type QuestionTextProps = {
    question: string;
    flagUrl?: string;
}

export default function QuestionText({ question, flagUrl }: QuestionTextProps) {  
    if (flagUrl && question.includes("{flag}")) {
        const parts = question.split("{flag}");
        return (
            <h2 className="text-center">
                {parts[0]}
                <Image
                    src={flagUrl}
                    alt="Flag"
                    width={24}
                    height={18}
                    style={{ verticalAlign: "middle", marginLeft: "6px" }}
                />
                {parts[1]}
            </h2>
        );
    }

    return <h2 className="text-center">{question}</h2>
}