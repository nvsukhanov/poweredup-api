import { RawMessage } from '../../types';
import {
    MessageType,
    MOTOR_LIMITS,
    MotorProfile,
    MotorServoEndState,
    OutputSubCommand,
    PortOperationCompletionInformation,
    PortOperationStartupInformation,
    WriteDirectModeDataSubCommand
} from '../../constants';
import { numberToUint32LEArray } from '../../helpers';
import { injectable } from 'tsyringe';

@injectable()
export class PortOutputCommandOutboundMessageFactory {
    public startRotation(
        portId: number,
        speed: number = MOTOR_LIMITS.maxSpeed,
        power: number = MOTOR_LIMITS.maxPower,
        profile: MotorProfile = MotorProfile.dontUseProfiles,
        startupMode: PortOperationStartupInformation = PortOperationStartupInformation.bufferIfNecessary,
        completionMode: PortOperationCompletionInformation = PortOperationCompletionInformation.noAction,
    ): RawMessage<MessageType.portOutputCommand> {
        this.ensureSpeedIsWithinLimits(speed);
        this.ensurePowerIsWithinLimits(power);

        return {
            header: {
                messageType: MessageType.portOutputCommand,
            },
            payload: new Uint8Array([
                portId,
                startupMode | completionMode,
                OutputSubCommand.startSpeed,
                speed,
                power,
                profile
            ])
        };
    }

    public goToAbsolutePosition(
        portId: number,
        absolutePosition: number,
        speed: number = MOTOR_LIMITS.maxSpeed,
        power: number = MOTOR_LIMITS.maxPower,
        endState: MotorServoEndState = MotorServoEndState.hold,
        profile: MotorProfile = MotorProfile.dontUseProfiles,
        startupMode: PortOperationStartupInformation = PortOperationStartupInformation.bufferIfNecessary,
        completionMode: PortOperationCompletionInformation = PortOperationCompletionInformation.noAction,
    ): RawMessage<MessageType.portOutputCommand> {
        this.ensureSpeedIsWithinLimits(speed);
        this.ensurePowerIsWithinLimits(power);
        this.ensureAbsolutePositionIsWithinLimits(absolutePosition);

        return {
            header: {
                messageType: MessageType.portOutputCommand,
            },
            payload: new Uint8Array([
                portId,
                startupMode | completionMode,
                OutputSubCommand.gotoAbsolutePosition,
                ...numberToUint32LEArray(absolutePosition),
                speed,
                power,
                endState,
                profile
            ])
        };
    }

    public presetEncoder(
        portId: number,
        absolutePosition: number,
    ): RawMessage<MessageType.portOutputCommand> {
        this.ensureAbsolutePositionIsWithinLimits(absolutePosition);

        return {
            header: {
                messageType: MessageType.portOutputCommand,
            },
            payload: new Uint8Array([
                portId,
                PortOperationStartupInformation.executeImmediately | PortOperationCompletionInformation.commandFeedback,
                OutputSubCommand.writeDirectModeData,
                WriteDirectModeDataSubCommand.presetEncoder,
                ...numberToUint32LEArray(absolutePosition),
            ])
        };
    }

    private ensureSpeedIsWithinLimits(speed: number): void {
        if (speed > MOTOR_LIMITS.maxSpeed || speed < MOTOR_LIMITS.minSpeed) {
            throw new Error(`Speed must be between ${MOTOR_LIMITS.minSpeed} and ${MOTOR_LIMITS.maxSpeed}. Got ${speed}`);
        }
    }

    private ensurePowerIsWithinLimits(power: number): void {
        if (power > MOTOR_LIMITS.maxPower || power < MOTOR_LIMITS.minPower) {
            throw new Error(`Power must be between ${MOTOR_LIMITS.minPower} and ${MOTOR_LIMITS.maxPower}. Got ${power}`);
        }
    }

    private ensureAbsolutePositionIsWithinLimits(absolutePosition: number): void {
        if (absolutePosition > MOTOR_LIMITS.maxRawAngle || absolutePosition < MOTOR_LIMITS.minRawAngle) {
            throw new Error(`Absolute position must be between ${MOTOR_LIMITS.minRawAngle} and ${MOTOR_LIMITS.maxRawAngle}. Got ${absolutePosition}`);
        }
    }

}
