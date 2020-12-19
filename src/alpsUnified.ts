/**
 * Convert option. So far only the format type
 */
export interface ConvertOptions {
  readonly formatType: FormatType;
};

/**
 * Format type to convert the ALPS spec into
 */
export enum FormatType {
  S, SDL,
  A, ASYNC, ASYNCAPI,
  O, OAS, OPEN, OPENAPI,
  OPENAPI_JSON,
  P, PROTO,
  J, JSON,
  W, WSDL, SOAP
};

// cleanup regex
const rxHash = /#/g;
const rxQ = /\?\?/g;

export class Alps {

  /**
   * Converts an ALPS spec JSON object into a specified API like openApi or graph ql schema
   *
   * @param alpsDocument The ALPS document.
   * @param options Options for the convertion
   * @return the requested api as a string
   */
  public static unified(alpsDocument: any, options: ConvertOptions = { formatType: FormatType.OPENAPI }) {

    return 'bla';
    let rtn = '';
    // process requested translation
    switch (options?.formatType) {
      case FormatType.S:
      case FormatType.SDL:
        rtn = toSDL(alpsDocument);
        break;
      case FormatType.A:
      case FormatType.ASYNC:
      case FormatType.ASYNCAPI:
        rtn = toAsync(alpsDocument);
        break;
      case FormatType.O:
      case FormatType.OAS:
      case FormatType.OPEN:
      case FormatType.OPENAPI:
        rtn = toOAS(alpsDocument);
        break;
      case FormatType.OPENAPI_JSON:
        rtn = toOAS(alpsDocument);
        // convert yaml string to json
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const yaml = require('js-yaml');
        rtn = JSON.stringify(yaml.safeLoad(rtn));
        break;
      case FormatType.P:
      case FormatType.PROTO:
        rtn = toProto(alpsDocument);
        break;
      case FormatType.J:
      case FormatType.JSON:
        rtn = toJSON(alpsDocument);
        break;
      case FormatType.W:
      case FormatType.WSDL:
      case FormatType.SOAP:
        rtn = toWSDL(alpsDocument);
        break;
      default:
        console.log(`ERROR: unknown format: ${options?.formatType}`);
    }
    //console.log(`rtn: ${rtn}`);
    return rtn;
  }

  /**
   * loads the ALPS document
   *
   * @param path ALPS spec file path
   */
  public static loadYaml(path: string) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const yaml = require('js-yaml');

    try {
      let fileContents = fs.readFileSync(path, 'utf8');
      let data = yaml.safeLoad(fileContents);
      // console.log(JSON.stringify(data));
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  public static spec(spec: AlpsSpec) {
    return Object.assign({}, spec);
  }
}

export interface AlpsSpec {
  /**
   * Indicates the root of the ALPS document. This property is REQUIRED, and it SHOULD have one or more 'descriptor' child properties.
   */
  readonly alps: AlpsDef;
}

export interface AlpsDef {
  /**
   * can be any string
   * e.g.: 1.0
   */
  readonly version: string;
  readonly doc: DocDef;
  readonly ext: ExtDef[];
  readonly descriptor: DescriptorDef[];
};

/**
   * A text field that contains free-form, usually human-readable, text.
   * The 'doc' element MAY have two properties: 'href' and 'format'.  If
   * the 'href' property appears it SHOULD contain a dereferencable URL
   * that points to human-readable text.  If the 'format' property appears
   * it SHOULD contain one of the following values: 'text', 'html',
   * 'asciidoc', or 'markdown'.  Any program processing 'doc' elements
   * SHOULD honor the 'format' directive and parse/render the content
   * appropriately.  If the value in the 'format' property is not
   * recognized and/or supported, the processing program MUST treat the
   * content as plain text.  If no 'format' property is present, the
   * content SHOULD be treated as plain text.
   * JSON:  { "doc" : { "format" : "text" , "value" : "Date of Birth ...""} }
   *
   * A 'doc' element SHOULD appear as a child of 'descriptor'.  When
   * present, it describes the meaning and use of the related 'descriptor'.
   * JSON:  { "descriptor" : [ { "doc" : { "value" : "..." } ...  ] }
   *
   * The 'doc' element MAY appear as a child of 'alps'.  When present, it
   * describes the purpose of the ALPS document as a whole.
   * JSON:  { "alps : { "doc" : { "value" : "..." } } ... }
   */
export interface DocDef {
  readonly href?: string;
  readonly format?: string;
  readonly value: string;
};

export interface ExtDef {
  readonly type: string;
  readonly name: string;
  readonly value: string;
  readonly tags: string;
  readonly href?: string;
  readonly id?: string;
}

export interface DescriptorDef {
  readonly id: string;
  readonly doc?: DocDef;
  readonly type: string;
  readonly rt?: string;
  readonly text: string;
  readonly tags?: string;
  readonly descriptor?: DescriptorDef[];
  readonly href?: string;
}

// *******************************************
// translators
// *******************************************

// ****************************************************
// to WSDL
// ****************************************************
function toWSDL(_doc: any) {
  let rtn = '';

  rtn += '<?xml version = \'1.0\' encoding = \'UTF-8\'?>\n';
  rtn += '<!-- generated by "unified" -->\n';
  rtn += `<!-- created: ${new Date()} -->\n`;
  rtn += '<!-- source: http://github.com/mamund/2020-11-unified -->\n';
  rtn += '\n';
  rtn += '<definitions>\n';
  rtn += '  <todo />\n';
  rtn += '</definitions>\n';
  return rtn;
}

// ****************************************************
// to ALPS JSON
// ****************************************************
function toJSON(doc: any) {
  var rtn = '';
  try {
    rtn = JSON.stringify(doc, null, 2);
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
  return rtn;
}

// ****************************************************
// to proto file
// passes https://protogen.marcgravell.com/ validator
// ****************************************************
function toProto(doc: any) {
  var rtn = '';
  var coll;

  // preamble
  rtn += 'syntax = "proto3";\n';
  rtn += `package ${doc.alps.ext.filter(metadata_title)[0].value.replace(/ /g, '_') || 'ALPS_API'};\n`;
  rtn += '\n';

  // signature
  rtn += '// *******************************************************************\n';
  rtn += '// generated by "unified"\n';
  rtn += `// date: ${new Date()}`;
  rtn += '\n';
  rtn += '// http://github.com/mamund/2020-11-unified\n';
  rtn += '// *******************************************************************\n';
  rtn += '\n';

  // params
  coll = doc.alps.descriptor.filter(semantic);
  coll.forEach(function (msg: any) {
    rtn += `message ${msg.id}Params {\n`;
    var c = 0;
    c++;
    rtn += `  string ${msg.id} = ${c};\n`;
    rtn += '}\n';
  });
  rtn += '\n';

  // objects
  coll = doc.alps.descriptor.filter(groups);
  coll.forEach(function (msg: any) {
    rtn += `message ${msg.id} {\n`;
    var c = 0;
    msg.descriptor.forEach(function (prop: any) {
      c++;
      rtn += `  string ${prop.href} = ${c};\n`;
    });
    rtn += '}\n';
    rtn += `message ${msg.id}Response {\n`;
    rtn += `  repeated ${msg.id} ${msg.id}Collection = 1;\n`;
    rtn += '}\n';
    rtn += `message ${msg.id}Empty {}\n`;
  });
  rtn += '\n';

  // procedures
  rtn += `service ${doc.alps.ext.filter(metadata_title)[0].value.replace(/ /g, '_') || 'ALPS_API'}_Service {\n`;

  coll = doc.alps.descriptor.filter(safe);
  coll.forEach(function (item: any) {
    rtn += `  rpc ${item.id}(`;
    if (item.descriptor) {
      rtn += item.descriptor[0].href;
    } else {
      rtn += `${item.rt}Empty`;
    }
    rtn += `) returns (${item.rt}Response) {};\n`;
  });

  coll = doc.alps.descriptor.filter(unsafe);
  coll.forEach(function (item: any) {
    rtn += `  rpc ${item.id}(`;
    if (item.descriptor) {
      rtn += item.descriptor[0].href;
    }
    rtn += `) returns (${item.rt}Response) {};\n`;
  });

  coll = doc.alps.descriptor.filter(idempotent);
  coll.forEach(function (item: any) {
    rtn += `  rpc ${item.id}(`;
    if (item.descriptor) {
      rtn += item.descriptor[0].href;
      if (item.descriptor[0].href === '#id') {
        rtn += 'Params';
      }
    }
    rtn += `) returns (${item.rt}Response) {};\n`;
  });

  rtn += '}\n';

  // clean up
  rtn = rtn.replace(rxHash, '');
  rtn = rtn.replace(rxQ, '#');

  return rtn;
}

// *******************************************
// to graphql sdl
// passes https://app.graphqleditor.com/
// *******************************************
function toSDL(doc: any) {
  var rtn = '';
  var coll;

  // signature
  rtn += '?? *******************************************************************\n';
  rtn += '?? generated by "unified"\n';
  rtn += `?? date: ${new Date()}`;
  rtn += '\n';
  rtn += '?? http://github.com/mamund/2020-11-unified\n';
  rtn += '?? *******************************************************************\n';
  rtn += '\n';

  // types
  coll = doc.alps.descriptor.filter(groups);
  coll.forEach(function (item: any) {
    rtn += `type ${item.id} {\n`;
    item.descriptor.forEach(function (prop: any) {
      rtn += `  ${prop.href}: String!\n`;
    });
    rtn += '}\n';
  });
  rtn += '\n';

  // query
  coll = doc.alps.descriptor.filter(safe);
  coll.forEach(function (item: any) {
    rtn += 'type Query {\n';
    rtn += `  ${item.id}: [${item.rt}]\n`;
    rtn += '}\n';
  });
  rtn += '\n';

  // mutations
  rtn += 'type Mutation {\n';
  coll = doc.alps.descriptor.filter(unsafe);
  coll.forEach(function (item: any) {
    rtn += `  ${item.id}(`;
    if (item.descriptor) {
      rtn += `${item.descriptor[0].href}: String!`;
    }
    rtn += `): ${item.rt}\n`;
  });
  coll = doc.alps.descriptor.filter(idempotent);
  coll.forEach(function (item: any) {
    rtn += `  ${item.id}(`;
    if (item.descriptor) {
      rtn += `${item.descriptor[0].href}: String!`;
    }
    rtn += `): ${item.rt}\n`;
  });
  rtn += '}\n';

  // final schema declaration
  rtn += '\n';
  rtn += 'schema {\n';
  rtn += '  query: Query,\n';
  rtn += '  mutation: Mutation\n';
  rtn += '}\n';

  rtn = rtn.replace(rxHash, '');
  rtn = rtn.replace(rxQ, '#');

  return rtn;
}

// ***************************************************
// to OpenAPI document
// passes https://apitools.dev/swagger-parser/online/
// ***************************************************
function toOAS(doc: any) {
  var rtn = '';
  var coll;

  // preamble
  rtn += 'openapi: 3.0.1\n';
  rtn += '\n';

  // signature
  rtn += '?? *******************************************************************\n';
  rtn += '?? generated by "unified" from\n';
  rtn += `?? date: ${new Date()}`;
  rtn += '\n';
  rtn += '?? http://github.com/mamund/2020-11-unified\n';
  rtn += '?? *******************************************************************\n';
  rtn += '\n';


  // info section
  rtn += 'info:\n';
  rtn += `  title: ${doc.alps.ext.filter(metadata_title)[0].value || 'ALPS API'}\n`;
  rtn += `  description: ${doc.alps.doc.value || 'Generated from ALPS file'}\n`;
  rtn += '  version: 1.0.0\n';
  rtn += '\n';

  if (doc.alps.ext.filter(metadata_root)) {
    rtn += 'servers:\n';
    rtn += `- url: '${doc.alps.ext.filter(metadata_root)[0].value}'\n`;
    rtn += '\n';
  }

  // paths
  rtn += 'paths:\n';

  // gets
  coll = doc.alps.descriptor.filter(safe);
  coll.forEach(function (item: any) {
    rtn += `  /${item.id}:\n`;
    rtn += '    get:\n';
    rtn += `      summary: '${item.text || item.id}'\n`;
    rtn += `      operationId: ${item.id}\n`;
    rtn += '      responses:\n';
    rtn += '        200:\n';
    rtn += `          description: ${item.id}\n`;
    rtn += '          content:\n';
    rtn += '            application/json:\n';
    rtn += '              schema:\n';
    rtn += '                type: array\n';
    rtn += '                items:\n';
    rtn += `                  $ref: '??/components/schemas/${item.rt || item.returns}'\n`;
  });

  // posts
  coll = doc.alps.descriptor.filter(unsafe);
  coll.forEach(function (item: any) {
    rtn += `  /${item.id}:\n`;
    rtn += '    post:\n';
    rtn += `      summary: '${item.text || item.id}'\n`;
    rtn += `      operationId: ${item.id}\n`;
    rtn += '      requestBody:\n';
    rtn += '        content:\n';
    rtn += '          application/json:\n';
    rtn += '            schema:\n';
    rtn += `              $ref: '??/components/schemas/${item.rt || item.returns}'\n`;
    rtn += '      responses:\n';
    rtn += '        200:\n';
    rtn += `          description: add ${item.id}\n`;
    rtn += '          content:\n';
    rtn += '            application/json:\n';
    rtn += '              schema:\n';
    rtn += '                type: array\n';
    rtn += '                items:\n';
    rtn += `                  $ref: '??/components/schemas/${item.rt || item.returns}'\n`;
  });

  // put
  coll = doc.alps.descriptor.filter(update);
  coll.forEach(function (item: any) {
    rtn += `  /${item.id}:\n`;
    rtn += '    put:\n';
    rtn += `      summary: '${item.text || item.id}'\n`;
    rtn += `      operationId: ${item.id}\n`;
    rtn += '      requestBody:\n';
    rtn += '        content:\n';
    rtn += '          application/json:\n';
    rtn += '            schema:\n';
    rtn += `              $ref: '??/components/schemas/${item.rt || item.returns}'\n`;
    rtn += '      responses:\n';
    rtn += '        200:\n';
    rtn += `          description: add ${item.id}\n`;
    rtn += '          content:\n';
    rtn += '            application/json:\n';
    rtn += '              schema:\n';
    rtn += '                type: array\n';
    rtn += '                items:\n';
    rtn += `                  $ref: '??/components/schemas/${item.rt || item.returns}'\n`;
  });

  // deletes
  coll = doc.alps.descriptor.filter(remove);
  coll.forEach(function (item: any) {
    rtn += `  /${item.id}/{id}:\n`;
    rtn += '    delete:\n';
    rtn += `      summary: '${item.text || item.id}'\n`;
    rtn += `      operationId: ${item.id}\n`;
    rtn += '      parameters:\n';
    item.descriptor.forEach(function (prop: any) {
      rtn += `        - name: ${prop.href}\n`;
      rtn += '          in: path\n';
      rtn += `          description: ${prop.href} of ${item.id}\n`;
      rtn += '          required: true\n';
      rtn += '          schema:\n';
      rtn += '            type: string\n';
    });
    rtn += '      responses:\n';
    rtn += '        204:\n';
    rtn += `          description: delete ${item.id}\n`;
  });
  rtn += '\n';

  // components
  rtn += 'components:\n';
  rtn += '  schemas:\n';
  coll = doc.alps.descriptor.filter(groups);
  coll.forEach(function (item: any) {
    rtn += `    ${item.id}:\n`;
    if (item.text) {
      rtn += `      description: ${item.text}\n`;
    }
    rtn += '      type: object\n';
    rtn += '      properties:\n';
    item.descriptor.forEach(function (prop: any) {
      rtn += `          ${prop.href}:\n`;
      rtn += '            type: string\n';
      rtn += `            example: ${rString(prop.href)}\n`;
    });
  });

  // clean up doc
  rtn = rtn.replace(rxHash, '');
  rtn = rtn.replace(rxQ, '#');

  return rtn;
}

// ****************************************************
// to AsyncAPI document (incomplete)
// ****************************************************
function toAsync(doc: any) {
  var rtn = '';
  // preamble
  rtn += 'async: 2.0.0\n';
  rtn += '\n';

  // signature
  rtn += '?? *******************************************************************\n';
  rtn += '?? generated by "unified" from\n';
  rtn += `?? date: ${new Date()}`;
  rtn += '\n';
  rtn += '?? http://github.com/mamund/2020-11-unified\n';
  rtn += '?? *******************************************************************\n';
  rtn += '\n';

  rtn += `id: '${doc.alps.id}'\n`;
  rtn += '\n';

  // info section
  rtn += 'info:\n';
  rtn += `  title: ${doc.alps.ext.filter(metadata_title)[0].value || 'ALPS API'}\n`;
  rtn += `  description: ${doc.alps.doc.value || 'Generated from ALPS file'}\n`;
  rtn += "  version: '1.0.0'\n";
  rtn += `  baseTopic: ${doc.alps.ext.filter(metadata_name)[0].value || ''}\n`;
  rtn += `  host: ${doc.alps.ext.filter(metadata_root)[0].value || 'http://localhost:8888/root'}\n`;
  rtn += '  schemes:\n';
  rtn += "    - 'amqp'\n";
  rtn += "    - 'mqtt'\n";
  rtn += '\n';

  rtn += '# topics:\n';
  rtn += '# **** TBD ****';

  // clean up doc
  rtn = rtn.replace(rxHash, '');
  rtn = rtn.replace(rxQ, '#');

  return rtn;
}

//*******************************************
// collection filters
//*******************************************
function semantic(doc: any) {
  return doc.type === 'semantic';
}

function groups(doc: any) {
  return doc.type === 'group';
}

function safe(doc: any) {
  return doc.type === 'safe';
}

function unsafe(doc: any) {
  return doc.type === 'unsafe';
}

function idempotent(doc: any) {
  return doc.type === 'idempotent';
}

function remove(doc: any) {
  return (doc.type === 'idempotent' && (doc.tags && doc.tags.indexOf('delete') != -1));
}

function update(doc: any) {
  return (doc.type === 'idempotent' && (doc.tags && doc.tags.indexOf('update') != -1));
}

function metadata_title(doc: any) {
  return (doc.type === 'metadata' && (doc.name && doc.name === ('title')));
}
function metadata_root(doc: any) {
  return (doc.type === 'metadata' && (doc.name && doc.name === ('root')));
}
function metadata_name(doc: any) {
  return (doc.type === 'metadata' && (doc.name && doc.name === ('name')));
}

function rString(id: string) {
  var rtn = '';
  if (id && id.indexOf('id') != -1) {
    rtn = Math.random().toString(9).substring(2, 4) + Math.random().toString(9).substring(2, 4);
  } else {
    rtn = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  return rtn;
}

