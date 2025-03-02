export interface ApiMethoParam {
  name: string;
  description: string;
  type: string;
  default?: string;
}

export interface ApiProperty {
  name: string;
  type: 'get' | 'set' | 'get;set;';
  description: string;
  returnType: string;
}

export interface ApiMethod {
  params?: ApiMethoParam[];
  returnType: string;
  name: string;
  description: string;
}

export interface ApiField {
  name: string;
  type: string;
  default?: string;
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

export interface ApiComponent extends ApiDirective {
  methods?: ApiMethod[];
}

export interface ApiInterface {
  name: string;
  description: string;
  fields?: ApiField[];
}
export interface ApiClass extends ApiInterface {
  methods?: ApiMethod[];
  properties?: ApiProperty[];
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
  services?: ApiClass[];
}
