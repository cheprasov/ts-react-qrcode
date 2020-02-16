import React, { useEffect, useState } from 'react';
// @ts-ignore
import { QRCodeCanvas } from '@cheprasov/qrcode';
import { ERROR_CORRECTION_LEVEL_LOW } from './Levels';

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

const QRCodeImg: React.FC<QRCodeImgProps> = (
    {
        value,
        alt = '',
        level = ERROR_CORRECTION_LEVEL_LOW,
        invert = false,
        padding = 1,
        fgColor = '#000',
        bgColor = '#fff',
        scale = 10,
        size = null,
        image,
    },
) => {
    const [qrData, setQrData] = useState<string>('');

    const createQrCode = () => {
        const config = { level, invert, padding, fgColor, bgColor, scale, size, image };
        const qrCodeCanvas = new QRCodeCanvas(value, config);
        const qrCodeData = qrCodeCanvas.toDataUrl() as (null | string | Promise<string>);
        if (qrCodeData instanceof Promise) {
            qrCodeData.then((dataUrl: string) => {
                setQrData(dataUrl);
            });
        } else {
            setQrData(qrCodeData || '');
        }
    };

    useEffect(() => {
        createQrCode();
    }, [level, invert, padding, fgColor, bgColor, scale, size, image]);

    if (!qrData) {
        return null;
    }

    return (
        <img className="QRCodeImg" src={qrData} alt={alt} />
    );
};

export default QRCodeImg;
