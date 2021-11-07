# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### KmsEncryptionKey <a name="kms-encryption-key.KmsEncryptionKey"></a>

#### Initializers <a name="kms-encryption-key.KmsEncryptionKey.Initializer"></a>

```typescript
import { KmsEncryptionKey } from 'kms-encryption-key'

new KmsEncryptionKey(scope: Construct, id: string, props?: IKmsEncryptionKeyProps)
```

##### `scope`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.props"></a>

- *Type:* [`kms-encryption-key.IKmsEncryptionKeyProps`](#kms-encryption-key.IKmsEncryptionKeyProps)

---

#### Methods <a name="Methods"></a>

##### `addTags` <a name="kms-encryption-key.KmsEncryptionKey.addTags"></a>

```typescript
public addTags()
```

##### `createKmsKey` <a name="kms-encryption-key.KmsEncryptionKey.createKmsKey"></a>

```typescript
public createKmsKey(administratorRoleArns: string[])
```

###### `administratorRoleArns`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.administratorRoleArns"></a>

- *Type:* `string`[]

---

##### `getKeyName` <a name="kms-encryption-key.KmsEncryptionKey.getKeyName"></a>

```typescript
public getKeyName(keyName?: string)
```

###### `keyName`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.keyName"></a>

- *Type:* `string`

---


#### Properties <a name="Properties"></a>

##### `description`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`

---

##### `environmentName`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.property.environmentName"></a>

```typescript
public readonly environmentName: string;
```

- *Type:* `string`

---

##### `keyName`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.property.keyName"></a>

```typescript
public readonly keyName: string;
```

- *Type:* `string`

---

##### `kmsKey`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* [`@aws-cdk/aws-kms.IKey`](#@aws-cdk/aws-kms.IKey)

---




## Protocols <a name="Protocols"></a>

### IKmsEncryptionKeyProps <a name="kms-encryption-key.IKmsEncryptionKeyProps"></a>

- *Implemented By:* [`kms-encryption-key.IKmsEncryptionKeyProps`](#kms-encryption-key.IKmsEncryptionKeyProps)


#### Properties <a name="Properties"></a>

##### `keyName`<sup>Required</sup> <a name="kms-encryption-key.IKmsEncryptionKeyProps.property.keyName"></a>

```typescript
public readonly keyName: string;
```

- *Type:* `string`

---

##### `administratorRoleArns`<sup>Optional</sup> <a name="kms-encryption-key.IKmsEncryptionKeyProps.property.administratorRoleArns"></a>

```typescript
public readonly administratorRoleArns: string[];
```

- *Type:* `string`[]

---

##### `description`<sup>Optional</sup> <a name="kms-encryption-key.IKmsEncryptionKeyProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`

---

##### `environmentName`<sup>Optional</sup> <a name="kms-encryption-key.IKmsEncryptionKeyProps.property.environmentName"></a>

```typescript
public readonly environmentName: string;
```

- *Type:* `string`

---

