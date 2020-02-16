import React from 'react';
export interface QRCodeImgProps {
    value: string;
    alt?: string;
    level?: string;
    invert?: boolean;
    padding?: number;
    fgColor?: string;
    bgColor?: string;
    scale?: number;
    size?: number;
    image?: {
        source: string | HTMLImageElement | HTMLCanvasElement;
        width: string | number;
        height: string | number;
        x?: string | number;
        y?: string | number;
        border?: number | null;
    };
}
declare const QRCodeImg: React.FC<QRCodeImgProps>;
export default QRCodeImg;
