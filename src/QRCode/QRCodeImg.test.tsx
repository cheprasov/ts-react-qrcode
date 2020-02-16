import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
// @ts-ignore
import QRCode from '@cheprasov/qrcode';
import QRCodeImg, { QRCodeImgProps } from './QRCodeImg';

jest.mock('@cheprasov/qrcode', () => {
    const mockQrCodeCanvas = {
        toDataUrl: () => 'data:image/png,qrcode',
        args: [],
    } as any;

    return {
        getConstructorArgs: (() => mockQrCodeCanvas.args),
        setToDataUrl: (f: Function) => {
            mockQrCodeCanvas.toDataUrl = f;
        },
        // eslint-disable-next-line
        QRCodeCanvas: function (...args: any[]) {
            mockQrCodeCanvas.args = args;
            return mockQrCodeCanvas;
        },
    };
});

describe('QRCodeImg', () => {
    let wrapper: ReactWrapper<QRCodeImgProps>;

    describe('constructor', () => {
        it('should use default params for QRCodeCanvas', () => {
            // given
            wrapper = mount(<QRCodeImg value="foo" />);
            // then
            expect(QRCode.getConstructorArgs()).toEqual([
                'foo',
                {
                    bgColor: '#fff',
                    fgColor: '#000',
                    image: undefined,
                    invert: false,
                    level: 'L',
                    padding: 1,
                    scale: 10,
                    size: null,
                },
            ]);
        });

        it('should replae default params for QRCodeCanvas', () => {
            // given
            wrapper = mount(
                <QRCodeImg
                    value="foo"
                    bgColor="#f00"
                    fgColor="#AAA"
                    invert
                    level="Q"
                    padding={2}
                    scale={42}
                    size={100}
                    image={{
                        source: 'some.png',
                        width: '10%',
                        height: '10%',
                    }}
                />
            );
            // then
            expect(QRCode.getConstructorArgs()).toEqual([
                'foo',
                {
                    bgColor: '#f00',
                    fgColor: '#AAA',
                    invert: true,
                    level: 'Q',
                    padding: 2,
                    scale: 42,
                    size: 100,
                    image: {
                        source: 'some.png',
                        width: '10%',
                        height: '10%',
                    },
                },
            ]);
        });
    });

    describe('render', () => {
        it('should render img with QR-code', () => {
            // given
            wrapper = mount(<QRCodeImg value="foo" />);
            // then
            const elem = wrapper.find('img.QRCodeImg');
            expect(elem.exists()).toBeTruthy();
            expect(elem.props()).toEqual({
                alt: '',
                className: 'QRCodeImg',
                src: 'data:image/png,qrcode',
            });
        });

        it('should render img with QR-code with alt test', () => {
            // given
            wrapper = mount(<QRCodeImg value="foo" alt="some-text" />);
            // then
            const elem = wrapper.find('img.QRCodeImg');
            expect(elem.prop('alt')).toEqual('some-text');
        });


        it('should render img with QR-code & image', async () => {
            let defer: Function;
            const promise = new Promise(resolve => {
                defer = resolve;
            });
            QRCode.setToDataUrl(() => promise);
            // given
            wrapper = mount(<QRCodeImg value="foo" />);
            expect(wrapper.exists('img.QRCodeImg')).toBeFalsy();
            // when
            await act(async () => {
                await defer('data:image/png,promise qrcode');
            });
            wrapper.update();
            // then
            expect(wrapper.exists('img.QRCodeImg')).toBeTruthy();
            expect(wrapper.find('img.QRCodeImg').props()).toEqual({
                alt: '',
                className: 'QRCodeImg',
                src: 'data:image/png,promise qrcode',
            });
        });
    });

});
