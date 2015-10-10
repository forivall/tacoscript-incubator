
export function ClassDeclaration(node) {
  this.printMultiple(node, "decorators", { separator: {type: "newline"} });
  this.newline();
  this.push("class");

  if (node.id) {
    this.print(node, "id");
  }

  this.print(node, "typeParameters");

  if (node.superClass) {
    this.push("extends");
    this.print(node, "superClass");
    this.print(node, "superTypeParameters");
  }

  if (node.implements) {
    this.push("implements");
    this.printMultiple(node, "implements", { separator: "," });
  }

  this.space();
  // NOTE: this is a classBody, not a block
  this.print(node.body, node);
}

export { ClassDeclaration as ClassExpression };

export function ClassBody(node) {
  this.indent();
  this.newline();
  // TODO: this.printInnerComments(node);
  if (node.body.length === 0) {
    // this.push("pass");
  } else {

    this.indent();
    this.printStatements(node, "body");
    this.dedent();

    this.rightBrace();
  }
  this.dedent();
}

export function ClassProperty(node) {
  this.printJoin(node.decorators, node, { separator: "" });

  if (node.static) this.push("static ");
  this.print(node.key, node);
  this.print(node.typeAnnotation, node);
  if (node.value) {
    this.space();
    this.push("=");
    this.space();
    this.print(node.value, node);
  }
  this.semicolon();
}

export function MethodDefinition(node) {
  this.printJoin(node.decorators, node, { separator: "" });

  if (node.static) {
    this.push("static ");
  }

  this._method(node);
}
