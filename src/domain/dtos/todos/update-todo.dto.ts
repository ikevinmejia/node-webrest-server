// * Data object transfer

export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completeAt?: Date,
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completeAt) returnObj.completeAt = this.completeAt;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completeAt } = props;

    if (!id || isNaN(Number(id))) return ["Id must be a valid number"];

    let newCompletedAt = completeAt;

    if (!completeAt) {
      newCompletedAt = new Date(completeAt);
      if (newCompletedAt.toString() === "Invalid Date") {
        return ["CompletedAt must be a valid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(text, newCompletedAt)];
  }
}
