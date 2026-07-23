// * Data object transfer

export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date, // Recomendado: igualar el nombre
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;

    // 1. Validar el ID
    if (!id || isNaN(Number(id))) {
      return ["Id must be a valid number", undefined];
    }

    let newCompletedAt = completedAt;

    // 2. Validar y transformar la fecha
    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (isNaN(newCompletedAt.getTime())) {
        return ["CompletedAt must be a valid date", undefined];
      }
    }

    // 3. ✅ Pasar los 3 argumentos en el orden correcto: id, text, newCompletedAt
    return [undefined, new UpdateTodoDto(Number(id), text, newCompletedAt)];
  }
}
