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
[DescriptorDefInner](#alps-unified-ts-descriptordefinner)|*No description*
[DescriptorDefOuter](#alps-unified-ts-descriptordefouter)|*No description*
[DocDef](#alps-unified-ts-docdef)|*No description*
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
  * **alps** (<code>[AlpsDef](#alps-unified-ts-alpsdef)</code>)  *No description* 

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
**descriptor** | <code>Array<[DescriptorDefOuter](#alps-unified-ts-descriptordefouter)></code> | <span></span>
**doc** | <code>[DocDef](#alps-unified-ts-docdef)</code> | <span></span>
**ext** | <code>Array<[ExtDef](#alps-unified-ts-extdef)></code> | <span></span>
**version** | <code>string</code> | <span></span>



## struct AlpsSpec  <a id="alps-unified-ts-alpsspec"></a>

__Obtainable from__: [Alps](#alps-unified-ts-alps).[spec](#alps-unified-ts-alps#alps-unified-ts-alps-spec)()





Name | Type | Description 
-----|------|-------------
**alps** | <code>[AlpsDef](#alps-unified-ts-alpsdef)</code> | <span></span>



## struct ConvertOptions  <a id="alps-unified-ts-convertoptions"></a>


Convert option.

So far only the format type



Name | Type | Description 
-----|------|-------------
**formatType** | <code>[FormatType](#alps-unified-ts-formattype)</code> | <span></span>



## struct DescriptorDefInner  <a id="alps-unified-ts-descriptordefinner"></a>






Name | Type | Description 
-----|------|-------------
**href** | <code>string</code> | <span></span>



## struct DescriptorDefOuter  <a id="alps-unified-ts-descriptordefouter"></a>






Name | Type | Description 
-----|------|-------------
**id** | <code>string</code> | <span></span>
**text** | <code>string</code> | <span></span>
**type** | <code>string</code> | <span></span>
**descriptor**? | <code>Array<[DescriptorDefInner](#alps-unified-ts-descriptordefinner)></code> | __*Optional*__
**rt**? | <code>string</code> | __*Optional*__
**tags**? | <code>string</code> | __*Optional*__



## struct DocDef  <a id="alps-unified-ts-docdef"></a>






Name | Type | Description 
-----|------|-------------
**value** | <code>string</code> | <span></span>



## struct ExtDef  <a id="alps-unified-ts-extdef"></a>






Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | <span></span>
**tags** | <code>string</code> | <span></span>
**type** | <code>string</code> | <span></span>
**value** | <code>string</code> | <span></span>



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
**P** |
**PROTO** |
**J** |
**JSON** |
**W** |
**WSDL** |
**SOAP** |


