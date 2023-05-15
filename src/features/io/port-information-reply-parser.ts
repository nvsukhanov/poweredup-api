import { InjectionToken } from 'tsyringe';

import { IReplyParser } from '../i-reply-parser';
import { MessageType } from '../../constants';

export const PORT_INFORMATION_REPLY_PARSER: InjectionToken<IReplyParser<MessageType.portInformation>> = Symbol('PORT_INFORMATION_REPLY_PARSER');
