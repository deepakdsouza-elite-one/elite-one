export type ServicesProps = {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    isMuted: boolean;
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    selectedFormat: "short" | "long";
    setSelectedFormat: React.Dispatch<React.SetStateAction<"short" | "long">>;
    data: any;
};