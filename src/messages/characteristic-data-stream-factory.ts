import { EMPTY, fromEvent, map, Observable, of, share, switchMap } from 'rxjs';
import { InboundMessageDissector, RawMessage } from './index';
import { MessageType } from '../constants';
import { IMessageMiddleware } from '../middleware';
import { injectable } from 'tsyringe';

@injectable()
export class CharacteristicDataStreamFactory {
    private readonly characteristicValueChangedEventName = 'characteristicvaluechanged';

    constructor(
        private readonly dissector: InboundMessageDissector,
    ) {
    }

    public create(
        characteristic: BluetoothRemoteGATTCharacteristic,
        messageMiddleware: IMessageMiddleware[]
    ): Observable<RawMessage<MessageType>> {
        return fromEvent(characteristic, this.characteristicValueChangedEventName).pipe(
            map((e) => this.getValueFromEvent(e)),
            switchMap((value) => value ? of(value) : EMPTY),
            map((uint8Message) => this.dissector.dissect(uint8Message)),
            map((message) => messageMiddleware.reduce((acc, middleware) => middleware.handle(acc), message)),
            share()
        );
    }

    private getValueFromEvent(event: Event): null | Uint8Array {
        const buffer = (event.target as BluetoothRemoteGATTCharacteristic).value?.buffer;
        if (!buffer) {
            return null;
        }
        return new Uint8Array(buffer);
    }
}
