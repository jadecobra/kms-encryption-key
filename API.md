# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### KmsEncryptionKey <a name="kms-encryption-key.KmsEncryptionKey"></a>

#### Initializers <a name="kms-encryption-key.KmsEncryptionKey.Initializer"></a>

```typescript
import { KmsEncryptionKey } from 'kms-encryption-key'

new KmsEncryptionKey(scope: Construct, id: string, props?: KmsEncryptionKeyProps)
```

##### `scope`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.props"></a>

- *Type:* [`kms-encryption-key.KmsEncryptionKeyProps`](#kms-encryption-key.KmsEncryptionKeyProps)

---

#### Methods <a name="Methods"></a>

##### `getKeyName` <a name="kms-encryption-key.KmsEncryptionKey.getKeyName"></a>

```typescript
public getKeyName(keyName?: string)
```

###### `keyName`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.keyName"></a>

- *Type:* `string`

---

#### Static Functions <a name="Static Functions"></a>

##### `createKeyPolicy` <a name="kms-encryption-key.KmsEncryptionKey.createKeyPolicy"></a>

```typescript
import { KmsEncryptionKey } from 'kms-encryption-key'

KmsEncryptionKey.createKeyPolicy(kmsAdministratorArns: string[])
```

###### `kmsAdministratorArns`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.kmsAdministratorArns"></a>

- *Type:* `string`[]

---

##### `getAdministratorArns` <a name="kms-encryption-key.KmsEncryptionKey.getAdministratorArns"></a>

```typescript
import { KmsEncryptionKey } from 'kms-encryption-key'

KmsEncryptionKey.getAdministratorArns(kmsAdministratorArns: string[])
```

###### `kmsAdministratorArns`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.kmsAdministratorArns"></a>

- *Type:* `string`[]

---

##### `getArnPrincipals` <a name="kms-encryption-key.KmsEncryptionKey.getArnPrincipals"></a>

```typescript
import { KmsEncryptionKey } from 'kms-encryption-key'

KmsEncryptionKey.getArnPrincipals(kmsAdministratorArns: string[])
```

###### `kmsAdministratorArns`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.parameter.kmsAdministratorArns"></a>

- *Type:* `string`[]

---

#### Properties <a name="Properties"></a>

##### `keyName`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.property.keyName"></a>

```typescript
public readonly keyName: string;
```

- *Type:* `string`

---

##### `kmsKey`<sup>Required</sup> <a name="kms-encryption-key.KmsEncryptionKey.property.kmsKey"></a>

```typescript
public readonly kmsKey: Key;
```

- *Type:* [`@aws-cdk/aws-kms.Key`](#@aws-cdk/aws-kms.Key)

---

##### `description`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKey.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`

---

##### `environmentName`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKey.property.environmentName"></a>

```typescript
public readonly environmentName: string;
```

- *Type:* `string`

---


## Structs <a name="Structs"></a>

### KmsEncryptionKeyProps <a name="kms-encryption-key.KmsEncryptionKeyProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { KmsEncryptionKeyProps } from 'kms-encryption-key'

const kmsEncryptionKeyProps: KmsEncryptionKeyProps = { ... }
```

##### `description`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKeyProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`

---

##### `environmentName`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKeyProps.property.environmentName"></a>

```typescript
public readonly environmentName: string;
```

- *Type:* `string`

---

##### `keyName`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKeyProps.property.keyName"></a>

```typescript
public readonly keyName: string;
```

- *Type:* `string`

---

##### `kmsAdministratorArns`<sup>Optional</sup> <a name="kms-encryption-key.KmsEncryptionKeyProps.property.kmsAdministratorArns"></a>

```typescript
public readonly kmsAdministratorArns: string[];
```

- *Type:* `string`[]

---



