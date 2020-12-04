# API Reference

**Classes**

Name|Description
----|-----------
[Alps](#alps-unified-ts-alps)|*No description*


**Structs**

Name|Description
----|-----------
[ConvertOptions](#alps-unified-ts-convertoptions)|Convert option.


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



```ts
static loadYaml(path: string): any
```

* **path** (<code>string</code>)  *No description*

__Returns__:
* <code>any</code>

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



## struct ConvertOptions  <a id="alps-unified-ts-convertoptions"></a>


Convert option.

So far only the format type



Name | Type | Description 
-----|------|-------------
**formatType** | <code>[FormatType](#alps-unified-ts-formattype)</code> | <span></span>



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


