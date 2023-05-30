import { DependencyContainer } from 'tsyringe';

import { CHARACTERISTIC_DATA_STREAM_FACTORY, GENERIC_ERRORS_REPLIES_PARSER, OUTBOUND_MESSAGE_FACTORY } from '../hub';
import { CharacteristicDataStreamFactory } from './characteristic-data-stream-factory';
import { OutboundMessengerFactory } from './outbound-messenger';
import {
    ATTACHED_IO_REPLIES_PARSER,
    HUB_ACTIONS_MESSAGE_FACTORY,
    HUB_ACTIONS_REPLY_PARSER,
    HUB_PROPERTIES_MESSAGE_FACTORY,
    HUB_PROPERTIES_REPLIES_PARSER,
    PORT_INFORMATION_REPLY_PARSER,
    PORT_INFORMATION_REQUEST_MESSAGE_FACTORY,
    PORT_INPUT_FORMAT_SETUP_MESSAGE_FACTORY,
    PORT_INPUT_FORMAT_SETUP_SINGLE_HANDSHAKE_REPLY_PARSER,
    PORT_MODE_INFORMATION_REPLY_PARSER,
    PORT_MODE_INFORMATION_REQUEST_MESSAGE_FACTORY,
    PORT_OUTPUT_COMMAND_FEEDBACK_REPLY_PARSER,
    PORT_OUTPUT_COMMAND_MESSAGE_FACTORY,
    PORT_VALUE_ABSOLUTE_POSITION_REPLY_PARSER,
    PORT_VALUE_POSITION_REPLY_PARSER,
    PORT_VALUE_SPEED_REPLY_PARSER
} from '../features';
import {
    AttachedIoReplyParser,
    GenericErrorReplyParser,
    HubActionsReplyParser,
    HubPropertiesReplyParser,
    PortInformationReplyParser,
    PortInputFormatSetupSingleHandshakeReplyParser,
    PortModeInformationReplyParser,
    PortOutputCommandFeedbackReplyParser,
    PortValueAbsolutePositionReplyParser,
    PortValuePositionReplyParser,
    PortValueSpeedReplyParser
} from './reply-parsers';
import {
    HubActionsOutboundMessageFactory,
    HubPropertiesOutboundMessageFactory,
    PortInformationRequestOutboundMessageFactory,
    PortInputFormatSetupSingleOutboundMessageFactory,
    PortModeInformationRequestOutboundMessageFactory,
    PortOutputCommandOutboundMessageFactory
} from './outbound-message-factories';

export function registerMessagesServices(
    container: DependencyContainer
): void {
    container.register(CHARACTERISTIC_DATA_STREAM_FACTORY, CharacteristicDataStreamFactory);
    container.register(OUTBOUND_MESSAGE_FACTORY, OutboundMessengerFactory);
    container.register(PORT_OUTPUT_COMMAND_FEEDBACK_REPLY_PARSER, PortOutputCommandFeedbackReplyParser);
    container.register(PORT_OUTPUT_COMMAND_MESSAGE_FACTORY, PortOutputCommandOutboundMessageFactory);
    container.register(HUB_PROPERTIES_REPLIES_PARSER, HubPropertiesReplyParser);
    container.register(PORT_INFORMATION_REPLY_PARSER, PortInformationReplyParser);
    container.register(ATTACHED_IO_REPLIES_PARSER, AttachedIoReplyParser);
    container.register(PORT_VALUE_ABSOLUTE_POSITION_REPLY_PARSER, PortValueAbsolutePositionReplyParser);
    container.register(PORT_VALUE_SPEED_REPLY_PARSER, PortValueSpeedReplyParser);
    container.register(PORT_VALUE_POSITION_REPLY_PARSER, PortValuePositionReplyParser);
    container.register(PORT_MODE_INFORMATION_REPLY_PARSER, PortModeInformationReplyParser);
    container.register(PORT_INPUT_FORMAT_SETUP_SINGLE_HANDSHAKE_REPLY_PARSER, PortInputFormatSetupSingleHandshakeReplyParser);
    container.register(PORT_INFORMATION_REQUEST_MESSAGE_FACTORY, PortInformationRequestOutboundMessageFactory);
    container.register(PORT_MODE_INFORMATION_REQUEST_MESSAGE_FACTORY, PortModeInformationRequestOutboundMessageFactory);
    container.register(PORT_INPUT_FORMAT_SETUP_MESSAGE_FACTORY, PortInputFormatSetupSingleOutboundMessageFactory);
    container.register(HUB_PROPERTIES_MESSAGE_FACTORY, HubPropertiesOutboundMessageFactory);
    container.register(GENERIC_ERRORS_REPLIES_PARSER, GenericErrorReplyParser);
    container.register(HUB_ACTIONS_REPLY_PARSER, HubActionsReplyParser);
    container.register(HUB_ACTIONS_MESSAGE_FACTORY, HubActionsOutboundMessageFactory);
}