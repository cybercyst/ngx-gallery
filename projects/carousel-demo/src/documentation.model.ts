export interface CompoDoc {
  pipes: Guard[];
  interfaces: Interface[];
  injectables: Injectable[];
  guards: Guard[];
  interceptors: any[];
  classes: Class[];
  directives: Directive[];
  components: Component[];
  modules: Module[];
  miscellaneous: Miscellaneous;
  routes: Routes;
  coverage: Coverage;
}

interface Class {
  name: string;
  id: string;
  file: string;
  deprecated: boolean;
  deprecationMessage: string;
  type: LinksubtypeEnum;
  sourceCode: string;
  constructorObj?: ConstructorObj;
  properties: Property[];
  methods: ClassMethod[];
  indexSignatures: any[];
  accessors?: ClassAccessors;
  inputsClass: any[];
  outputsClass: any[];
  hostBindings: any[];
  hostListeners: any[];
  implements?: string[];
}

interface ClassAccessors {
  loadChanged?: ActiveItemChanged;
  activePageChanged?: ActiveItemChanged;
  activeItemChanged?: ActiveItemChanged;
  snapshot?: ActiveItemChanged;
  playChanged?: ActiveItemChanged;
  itemSize?: ItemSize;
}

interface ActiveItemChanged {
  name: string;
  getSignature: ActiveItemChangedGetSignature;
}

interface ActiveItemChangedGetSignature {
  name: string;
  type: string;
  returnType: string;
  line: number;
  rawdescription: string;
  description: string;
}

interface ItemSize {
  name: string;
  getSignature: ItemSizeGetSignature;
}

interface ItemSizeGetSignature {
  name: string;
  type: string;
  returnType: string;
  line: number;
}

interface ConstructorObj {
  name: string;
  description?: string;
  deprecated: boolean;
  deprecationMessage: string;
  args: ConstructorObjArg[];
  line: number;
  jsdoctags?: ConstructorObjJsdoctag[];
  type?: ReturnTypeEnum;
  returnType?: string;
  optional?: boolean;
  typeParameters?: any[];
  modifierKind?: number[];
}

interface ConstructorObjArg {
  name: string;
  type: string;
  deprecated: boolean;
  deprecationMessage: string;
}

interface ConstructorObjJsdoctag {
  name: string;
  type: string;
  deprecated: boolean;
  deprecationMessage: string;
  tagName: TagName;
}

interface TagName {
  text: Text;
}

enum Text {
  Param = 'param',
}

enum ReturnTypeEnum {
  Any = 'any',
  Number = 'number',
  ObservableAny = 'Observable<any>',
  ObservableBoolean = 'Observable<boolean>',
  Void = 'void',
}

interface ClassMethod {
  name: string;
  args: JsdoctagElement[];
  optional: boolean;
  returnType: ReturnTypeEnum;
  typeParameters: any[];
  line: number;
  deprecated: boolean;
  deprecationMessage: string;
  rawdescription?: string;
  description?: string;
  modifierKind?: number[];
  jsdoctags?: PurpleJsdoctag[];
}

interface JsdoctagElement {
  name?: string;
  type?: string;
  deprecated: boolean;
  deprecationMessage: string;
  defaultValue?: string;
  optional?: boolean;
  tagName?: TagName;
  value?: string;
}

interface PurpleJsdoctag {
  name?: TagNameClass | string;
  type: string;
  deprecated: boolean;
  deprecationMessage: string;
  tagName: TagNameClass;
  comment?: string;
  defaultValue?: string;
  optional?: boolean;
}

interface TagNameClass {
  pos?: number;
  end?: number;
  flags?: number;
  modifierFlagsCache?: number;
  transformFlags?: number;
  kind?: number;
  escapedText?: string;
  text?: Text;
}

interface Property {
  name: string;
  defaultValue?: string;
  deprecated: boolean;
  deprecationMessage: string;
  type?: string;
  optional?: boolean;
  description?: string;
  line: number;
  rawdescription?: string;
  modifierKind?: number[];
  decorators?: Decorator[];
  inheritance?: Inheritance;
}

interface Decorator {
  name: string;
  stringifiedArguments: string;
}

interface Inheritance {
  file: Extends;
}

enum Extends {
  CarouselCore = 'CarouselCore',
  CentralisedCarousel = 'CentralisedCarousel',
}

enum LinksubtypeEnum {
  Class = 'class',
  Component = 'component',
  Directive = 'directive',
  Function = 'function',
  Guard = 'guard',
  Injectable = 'injectable',
  Interface = 'interface',
  Pipe = 'pipe',
  Variable = 'variable',
}

interface Component {
  name: string;
  id: string;
  file: string;
  encapsulation: any[];
  entryComponents: any[];
  host?: Host;
  inputs: any[];
  outputs: any[];
  providers: Provider[];
  selector: string;
  styleUrls: string[];
  styles: string[];
  templateUrl: string[];
  viewProviders: any[];
  inputsClass: Property[];
  outputsClass: Property[];
  propertiesClass: Property[];
  methodsClass: ComponentMethodsClass[];
  deprecated: boolean;
  deprecationMessage: string;
  hostBindings: HostBinding[];
  hostListeners: any[];
  description: string;
  rawdescription: Rawdescription;
  type: LinksubtypeEnum;
  sourceCode: string;
  assetsDirs: any[];
  styleUrlsData: StyleUrlsDatum[];
  stylesData: string;
  constructorObj?: ConstructorObj;
  implements?: Implement[];
  templateData?: string;
  changeDetection?: ChangeDetection;
  extends?: Extends;
  accessors?: ComponentAccessors;
  template?: string;
}

interface ComponentAccessors {
  valueAsStyle?: ItemSize;
  thumbOrientation?: ItemSize;
  itemSize?: ItemSize;
  src?: PauseVideo;
  pauseVideo?: PauseVideo;
  imageLoadSuccess?: ItemSize;
  imageLoadFailed?: ItemSize;
  playVideo?: PauseVideo;
  itemWidth?: ItemSize;
  itemHeight?: ItemSize;
}

interface PauseVideo {
  name: string;
  setSignature: ConstructorObj;
}

enum ChangeDetection {
  ChangeDetectionStrategyOnPush = 'ChangeDetectionStrategy.OnPush',
}

interface Host {
}

interface HostBinding {
  name: string;
  deprecated: boolean;
  deprecationMessage: string;
  line: number;
  type?: HostBindingType;
  decorators?: any[];
  defaultValue?: string;
}

enum HostBindingType {
  Any = 'any',
  Boolean = 'boolean',
  EventEmitter = 'EventEmitter',
}

enum Implement {
  AfterViewChecked = 'AfterViewChecked',
  AfterViewInit = 'AfterViewInit',
  OnChanges = 'OnChanges',
  OnDestroy = 'OnDestroy',
  OnInit = 'OnInit',
}

interface ComponentMethodsClass {
  name: string;
  args: JsdoctagElement[];
  optional: boolean;
  returnType: ReturnTypeEnum;
  typeParameters: any[];
  line: number;
  deprecated: boolean;
  deprecationMessage: string;
  jsdoctags?: JsdoctagElement[];
  rawdescription?: string;
  description?: string;
  inheritance?: Inheritance;
  modifierKind?: number[];
}

interface Provider {
  name: string;
}

enum Rawdescription {
  Empty = '\n',
}

interface StyleUrlsDatum {
  data: string;
  styleUrl: string;
}

interface Coverage {
  count: number;
  status: Status;
  files: File[];
}

interface File {
  filePath: string;
  type: LinksubtypeEnum;
  linktype: LinktypeEnum;
  linksubtype?: LinksubtypeEnum;
  name: string;
  coveragePercent: number;
  coverageCount: string;
  status: Status;
}

enum LinktypeEnum {
  Classe = 'classe',
  Component = 'component',
  Directive = 'directive',
  Guard = 'guard',
  Injectable = 'injectable',
  Interface = 'interface',
  Miscellaneous = 'miscellaneous',
  Pipe = 'pipe',
}

enum Status {
  Good = 'good',
  Low = 'low',
  Medium = 'medium',
  VeryGood = 'very-good',
}

interface Directive {
  name: string;
  id: string;
  file: string;
  type: LinksubtypeEnum;
  description: string;
  rawdescription: string;
  sourceCode: string;
  selector: string;
  providers: Provider[];
  inputsClass: Property[];
  outputsClass: HostBinding[];
  deprecated: boolean;
  deprecationMessage: string;
  hostBindings: any[];
  hostListeners: any[];
  propertiesClass: Property[];
  methodsClass: DirectiveMethodsClass[];
  implements?: string[];
  constructorObj: ConstructorObj;
  accessors?: DirectiveAccessors;
}

interface DirectiveAccessors {
  itemSize?: ItemSize;
  state?: ItemSize;
  snapshot?: ItemSize;
  ngAttr?: PauseVideo;
  debounce?: Debounce;
  disabled?: Debounce;
}

interface Debounce {
  name: string;
  setSignature: ConstructorObj;
  getSignature: ActiveItemChangedGetSignature;
}

interface DirectiveMethodsClass {
  name: string;
  args: JsdoctagElement[];
  optional: boolean;
  returnType: ReturnTypeEnum;
  typeParameters: any[];
  line: number;
  deprecated: boolean;
  deprecationMessage: string;
  rawdescription?: string;
  description?: string;
  modifierKind?: number[];
  jsdoctags?: JsdoctagElement[];
}

interface Guard {
  name: string;
  id: string;
  file: string;
  properties: any[];
  methods: ConstructorObj[];
  deprecated: boolean;
  deprecationMessage: string;
  description: string;
  rawdescription: Rawdescription;
  sourceCode: string;
  type: LinksubtypeEnum;
  ngname?: string;
}

interface Injectable {
  name: string;
  id: string;
  file: string;
  properties: Property[];
  methods: InjectableMethod[];
  deprecated: boolean;
  deprecationMessage: string;
  description: string;
  rawdescription: Rawdescription;
  sourceCode: string;
  constructorObj: ConstructorObj;
  type: LinksubtypeEnum;
}

interface InjectableMethod {
  name: string;
  args: JsdoctagElement[];
  optional: boolean;
  returnType: string;
  typeParameters: any[];
  line: number;
  deprecated: boolean;
  deprecationMessage: string;
  jsdoctags: JsdoctagElement[];
}

interface Interface {
  name: string;
  id: string;
  file: string;
  deprecated: boolean;
  deprecationMessage: string;
  type: LinksubtypeEnum;
  sourceCode: string;
  properties: Property[];
  indexSignatures: any[];
  kind: number;
  methods: any[];
  isDuplicate?: boolean;
  duplicateId?: number;
  duplicateName?: string;
  description?: string;
  rawdescription?: string;
}

interface Miscellaneous {
  variables: Enumeration[];
  functions: Func[];
  typealiases: Enumeration[];
  enumerations: Enumeration[];
  groupedVariables: { [key: string]: Enumeration[] };
  groupedFunctions: GroupedFunctions;
  groupedEnumerations: GroupedEnumerations;
  groupedTypeAliases: { [key: string]: Enumeration[] };
}

interface Enumeration {
  name: string;
  childs?: EnumerationChild[];
  ctype: LinktypeEnum;
  subtype: Subtype;
  deprecated: boolean;
  deprecationMessage: string;
  description?: Description;
  file: string;
  rawtype?: string;
  kind?: number;
  type?: string;
  defaultValue?: string;
  rawdescription?: string;
}

interface EnumerationChild {
  name: string;
  deprecated: boolean;
  deprecationMessage: string;
  value: string;
}

enum Description {
  Empty = '',
  PDefaultConfigP = '<p>Default config</p>\n',
  PInitialStateP = '<p>Initial state</p>\n',
  PTheStateOfEachStepP = '<p>The state of each step.</p>\n',
}

enum Subtype {
  Enum = 'enum',
  Typealias = 'typealias',
  Variable = 'variable',
}

interface Func {
  name: string;
  file: string;
  ctype: LinktypeEnum;
  subtype: LinksubtypeEnum;
  deprecated: boolean;
  deprecationMessage: string;
  description: string;
  args: ConstructorObjArg[];
  jsdoctags: ConstructorObjJsdoctag[];
  returnType?: string;
}

type GroupedEnumerations = Record<string, Enumeration[]>;

type GroupedFunctions = Record<string, Func[]>;

interface Module {
  name: string;
  id: string;
  description: string;
  deprecationMessage: string;
  deprecated: boolean;
  file: string;
  methods: ConstructorObj[];
  sourceCode: string;
  children: ModuleChild[];
}

interface ModuleChild {
  type: ChildType;
  elements: Provider[];
}

enum ChildType {
  Bootstrap = 'bootstrap',
  Classes = 'classes',
  Declarations = 'declarations',
  Exports = 'exports',
  Imports = 'imports',
  Providers = 'providers',
}

interface Routes {
  name: string;
  kind: Kind;
  className: string;
  children: RoutesChild[];
}

interface RoutesChild {
  name: string;
  filename: string;
  module: string;
  children: PurpleChild[];
  kind: Kind;
}

interface StickyChild {
  path: string;
  component: string;
  children: PurpleChild[];
}

interface TentacledChild {
  name: string;
  filename: string;
  module: string;
  children: StickyChild[];
  kind: Kind;
}

interface FluffyChild {
  kind: Kind;
  children: TentacledChild[];
  module: string;
}

interface PurpleChild {
  path: string;
  loadChildren?: string;
  pathMatch?: string;
  children?: FluffyChild[];
  redirectTo?: string;
}

enum Kind {
  Module = 'module',
}
