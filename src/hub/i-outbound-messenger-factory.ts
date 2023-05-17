import { InjectionToken } from 'tsyringe';
import { Observable } from 'rxjs';

import { IOutboundMessenger } from './i-outbound-messenger';
import { RawMessage } from '../types';
import { MessageType } from '../constants';
import { IMessageMiddleware } from './i-message-middleware';
import { GenericError } from './i-hub';

export interface IOutboundMessengerFactory {
    create(
        characteristicDataStream: Observable<RawMessage<MessageType>>,
        genericErrorsStream: Observable<GenericError>,
        characteristic: BluetoothRemoteGATTCharacteristic,
        messageMiddleware: ReadonlyArray<IMessageMiddleware>,
        onDisconnected$: Observable<void>
    ): IOutboundMessenger;
}

export const OUTBOUND_MESSAGE_FACTORY: InjectionToken<IOutboundMessengerFactory> = Symbol('OUTBOUND_MESSAGE_FACTORY');
