/* eslint-disable */

export interface MessageType<Message extends UnknownMessage = UnknownMessage> {
  $type: Message["$type"];
}

export type UnknownMessage = { $type: string };

export const messageTypeRegistry = new Map<string, MessageType>();
