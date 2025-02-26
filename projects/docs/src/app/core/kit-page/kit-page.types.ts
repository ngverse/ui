export interface ApiMethod {
  params: Record<string, string>;
  returnType: string;
  name: string;
  description: string;
}

export interface ApiOutput {
  name: string;
  type: string;
  description: string;
}

export interface ApiInput {
  name: string;
  type: string;
  default?: unknown;
  required?: boolean;
  description: string;
}

export interface ApiDirective {
  name: string;
  selector: string;
  description: string;
  methods?: ApiMethod[];
  outputs?: ApiOutput[];
  inputs?: ApiInput[];
}

export interface ApiComponent {
  name: string;
  selector: string;
  description: string;
  methods?: ApiMethod[];
  outputs?: ApiOutput[];
  inputs?: ApiInput[];
}

export interface ApiClass {
  name: string;
  selector: string;
  description: string;
  methods?: ApiMethod[];
  outputs?: ApiOutput[];
  inputs?: ApiInput[];
}

export interface ApiInterface {
  name: string;
  selector: string;
  description: string;
  methods?: ApiMethod[];
  outputs?: ApiOutput[];
  inputs?: ApiInput[];
}

export interface ApiConstant {
  name: string;
  selector: string;
  description: string;
  methods?: ApiMethod[];
  outputs?: ApiOutput[];
  inputs?: ApiInput[];
}

export interface ApiFunction {
  name: string;
  selector: string;
  description: string;
  methods?: ApiMethod[];
  outputs?: ApiOutput[];
  inputs?: ApiInput[];
}

export interface ApiSection {
  directives?: ApiDirective[];
  components?: ApiComponent[];
  classes?: ApiClass[];
  interfaces?: ApiInterface[];
  constants?: ApiConstant[];
  functions?: ApiFunction[];
}
