import { Injectable, signal } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ERROR_TYPE = Record<string, string | ((params: any) => string)>;

const DEFAULT_ERRORS: Record<string, string> = {
  required: 'This field is required',
  email: 'Enter a valid email address',
  min: 'This field is too short',
  max: 'This field is too long',
};

@Injectable({
  providedIn: 'root',
})
export class FormFieldErrorRegistry {
  private _errors = signal<ERROR_TYPE>(DEFAULT_ERRORS);

  errors = this._errors.asReadonly();

  getMessage(code: string, params?: unknown) {
    const foundError = this._errors()[code];
    if (!foundError) {
      return undefined;
    }
    if (foundError instanceof Function) {
      return foundError(params);
    }
    return foundError;
  }

  addErrors(errors: ERROR_TYPE) {
    this._errors.set({ ...this._errors(), ...errors });
  }

  setErrors(errors: ERROR_TYPE) {
    this._errors.set(errors);
  }
}
