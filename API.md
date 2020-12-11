# API Reference

**Classes**

Name|Description
----|-----------
[Alps](#alps-unified-ts-alps)|*No description*


**Structs**

Name|Description
----|-----------
[AlpsDef](#alps-unified-ts-alpsdef)|*No description*
[AlpsSpec](#alps-unified-ts-alpsspec)|*No description*
[ConvertOptions](#alps-unified-ts-convertoptions)|Convert option.
[DescriptorDef](#alps-unified-ts-descriptordef)|*No description*
[DocDef](#alps-unified-ts-docdef)|A text field that contains free-form, usually human-readable, text.
[ExtDef](#alps-unified-ts-extdef)|*No description*


**Enums**

Name|Description
----|-----------
[FormatType](#alps-unified-ts-formattype)|Format type to convert the ALPS spec into.



## class Alps  <a id="alps-unified-ts-alps"></a>




### Initializer




```ts
new Alps()
```



### Methods


#### *static* loadYaml(path) <a id="alps-unified-ts-alps-loadyaml"></a>

loads the ALPS document.

```ts
static loadYaml(path: string): any
```

* **path** (<code>string</code>)  ALPS spec file path.

__Returns__:
* <code>any</code>

#### *static* spec(spec) <a id="alps-unified-ts-alps-spec"></a>



```ts
static spec(spec: AlpsSpec): AlpsSpec
```

* **spec** (<code>[AlpsSpec](#alps-unified-ts-alpsspec)</code>)  *No description*
  * **alps** (<code>[AlpsDef](#alps-unified-ts-alpsdef)</code>)  Indicates the root of the ALPS document. 

__Returns__:
* <code>[AlpsSpec](#alps-unified-ts-alpsspec)</code>

#### *static* unified(alpsDocument, options?) <a id="alps-unified-ts-alps-unified"></a>

Converts an ALPS spec JSON object into a specified API like openApi or graph ql schema.

```ts
static unified(alpsDocument: any, options?: ConvertOptions): string
```

* **alpsDocument** (<code>any</code>)  The ALPS document.
* **options** (<code>[ConvertOptions](#alps-unified-ts-convertoptions)</code>)  Options for the convertion.
  * **formatType** (<code>[FormatType](#alps-unified-ts-formattype)</code>)  *No description* 

__Returns__:
* <code>string</code>



## struct AlpsDef  <a id="alps-unified-ts-alpsdef"></a>






Name | Type | Description 
-----|------|-------------
**descriptor** | <code>Array<[DescriptorDef](#alps-unified-ts-descriptordef)></code> | <span></span>
**doc** | <code>[DocDef](#alps-unified-ts-docdef)</code> | <span></span>
**ext** | <code>Array<[ExtDef](#alps-unified-ts-extdef)></code> | <span></span>
**version** | <code>string</code> | can be any string e.g.: 1.0.



## struct AlpsSpec  <a id="alps-unified-ts-alpsspec"></a>

__Obtainable from__: [Alps](#alps-unified-ts-alps).[spec](#alps-unified-ts-alps#alps-unified-ts-alps-spec)()





Name | Type | Description 
-----|------|-------------
**alps** | <code>[AlpsDef](#alps-unified-ts-alpsdef)</code> | Indicates the root of the ALPS document.



## struct ConvertOptions  <a id="alps-unified-ts-convertoptions"></a>


Convert option.

So far only the format type



Name | Type | Description 
-----|------|-------------
**formatType** | <code>[FormatType](#alps-unified-ts-formattype)</code> | <span></span>



## struct DescriptorDef  <a id="alps-unified-ts-descriptordef"></a>






Name | Type | Description 
-----|------|-------------
**id** | <code>string</code> | <span></span>
**text** | <code>string</code> | <span></span>
**type** | <code>string</code> | <span></span>
**descriptor**? | <code>Array<[DescriptorDef](#alps-unified-ts-descriptordef)></code> | __*Optional*__
**doc**? | <code>[DocDef](#alps-unified-ts-docdef)</code> | __*Optional*__
**href**? | <code>string</code> | __*Optional*__
**rt**? | <code>string</code> | __*Optional*__
**tags**? | <code>string</code> | __*Optional*__



## struct DocDef  <a id="alps-unified-ts-docdef"></a>


A text field that contains free-form, usually human-readable, text.

The 'doc' element MAY have two properties: 'href' and 'format'.  If
the 'href' property appears it SHOULD contain a dereferencable URL
that points to human-readable text.  If the 'format' property appears
it SHOULD contain one of the following values: 'text', 'html',
'asciidoc', or 'markdown'.  Any program processing 'doc' elements
SHOULD honor the 'format' directive and parse/render the content
appropriately.  If the value in the 'format' property is not
recognized and/or supported, the processing program MUST treat the
content as plain text.  If no 'format' property is present, the
content SHOULD be treated as plain text.
JSON:  { "doc" : { "format" : "text" , "value" : "Date of Birth ...""} }

A 'doc' element SHOULD appear as a child of 'descriptor'.  When
present, it describes the meaning and use of the related 'descriptor'.
JSON:  { "descriptor" : [ { "doc" : { "value" : "..." } ...  ] }

The 'doc' element MAY appear as a child of 'alps'.  When present, it
describes the purpose of the ALPS document as a whole.
JSON:  { "alps : { "doc" : { "value" : "..." } } ... }



Name | Type | Description 
-----|------|-------------
**value** | <code>string</code> | <span></span>
**format**? | <code>string</code> | __*Optional*__
**href**? | <code>string</code> | __*Optional*__



## struct ExtDef  <a id="alps-unified-ts-extdef"></a>






Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | <span></span>
**tags** | <code>string</code> | <span></span>
**type** | <code>string</code> | <span></span>
**value** | <code>string</code> | <span></span>
**href**? | <code>string</code> | __*Optional*__
**id**? | <code>string</code> | __*Optional*__



## enum FormatType  <a id="alps-unified-ts-formattype"></a>

Format type to convert the ALPS spec into.

Name | Description
-----|-----
**S** |
**SDL** |
**A** |
**ASYNC** |
**ASYNCAPI** |
**O** |
**OAS** |
**OPEN** |
**OPENAPI** |
**OPENAPI_JSON** |
**P** |
**PROTO** |
**J** |
**JSON** |
**W** |
**WSDL** |
**SOAP** |


