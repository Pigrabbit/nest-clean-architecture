class Validator {
  validate(target: any): boolean {
    return true;
  }
}

class ValidatorFactory {
  getValidator() {
    return new Validator();
  }
}

class Validation {
  static buildDefaultValidationFactory():ValidatorFactory {
    return new ValidatorFactory()
  }
}

abstract class SelfValidating<T> {
  private validator: Validator;
  abstract validate(): boolean;

  constructor() {
    const factory = Validation.buildDefaultValidationFactory();
    this.validator = factory.getValidator();
  }

  protected validateSelf(): void {
    if (!this.validator.validate(this)) {
      throw new Error();
    }
  }
}
