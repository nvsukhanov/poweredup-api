import { Observable, filter, map, takeUntil } from 'rxjs';

import { MessageType } from '../../constants';
import { IReplyParser } from '../i-reply-parser';
import { InboundMessage, RawMessage } from '../../types';
import { IInboundMessageListener } from './i-inbound-message-listener';

export class InboundMessageListener<TMessageType extends MessageType> implements IInboundMessageListener<TMessageType> {
    constructor(
        private readonly characteristicDataStream: Observable<RawMessage<MessageType>>,
        private readonly replyParserService: IReplyParser<TMessageType>,
        private readonly onDisconnected$: Observable<void>,
    ) {
    }

    public get replies$(): Observable<InboundMessage & { messageType: TMessageType }> {
        return this.characteristicDataStream.pipe(
            filter((message) => message.header.messageType === this.replyParserService.messageType),
            map((message) => this.replyParserService.parseMessage(message as RawMessage<TMessageType>)),
            takeUntil(this.onDisconnected$)
        );
    }
}
