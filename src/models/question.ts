export interface Question {
  name: string;
  value: string;
  type: QuestionType;
}

export interface QuestionType {
  name: string;
}

export class Text implements QuestionType {
  name = 'text';
}

export class MultipleChoice implements QuestionType {
  name = 'multipleChoice';
  options: string[] = [];
}

export class CheckBox implements QuestionType {
  name = 'checkBox';
  options: string[] = [];
}

export class VoiceOrText implements QuestionType {
  name = 'voiceOrText';
}

export class Location implements QuestionType {
  name = 'location';
}
