import { Observable } from 'rxjs';
import { inject, injectable } from 'tsyringe';

import { MessageType } from '../../constants';
import { HubPropertiesFeature } from './hub-properties-feature';
import { ConnectionErrorFactory } from '../../errors';
import { ILogger } from '../../logging';
import { RawMessage } from '../../types';
import { IHubPropertiesFeature } from './i-hub-properties-feature';
import { IOutboundMessenger } from '../i-outbound-messenger';
import { IInboundMessageListenerFactory, INBOUND_MESSAGE_LISTENER_FACTORY } from '../i-inbound-message-listener-factory';
import { HUB_PROPERTIES_REPLIES_PARSER } from './hub-properties-reply-parser';
import { IReplyParser } from '../i-reply-parser';
import { HUB_PROPERTIES_MESSAGE_FACTORY, IHubPropertiesMessageFactory } from './i-hub-properties-message-factory';

@injectable()
export class HubPropertiesFeatureFactory {
    constructor(
        @inject(INBOUND_MESSAGE_LISTENER_FACTORY) private readonly messageListenerFactory: IInboundMessageListenerFactory,
        @inject(HUB_PROPERTIES_REPLIES_PARSER) private readonly replyParser: IReplyParser<MessageType.properties>,
        @inject(HUB_PROPERTIES_MESSAGE_FACTORY) private readonly messageFactory: IHubPropertiesMessageFactory,
        private readonly errorsFactory: ConnectionErrorFactory
    ) {
    }

    public create(
        advertisingName: string,
        characteristicDataStream: Observable<RawMessage<MessageType>>,
        onHubDisconnected: Observable<void>,
        messenger: IOutboundMessenger,
        logger: ILogger
    ): IHubPropertiesFeature {
        const replies$ = this.messageListenerFactory.create(
            characteristicDataStream,
            this.replyParser,
            onHubDisconnected,
        );
        return new HubPropertiesFeature(
            advertisingName,
            this.messageFactory,
            messenger,
            logger,
            replies$,
            this.errorsFactory
        );
    }
}
