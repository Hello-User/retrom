# retrom

A centralized game library/collection management service with a focus on emulation. Configure once, play anywhere.

![Version: 0.2.17](https://img.shields.io/badge/Version-0.2.17-informational?style=flat-square)
![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square)
![AppVersion: 0.2.7](https://img.shields.io/badge/AppVersion-0.2.7-informational?style=flat-square)

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| namespace | string | `"retrom-helm"` |  |
| postgres.enabled | bool | `true` | Optional: Disable if you run your own postgres server |
| postgres.image.pullPolicy | string | `"Always"` |  |
| postgres.password | string | `"please_changeme_and_maybe_try_to_use_a_kubernetes_secret_:)"` | Required: password for the postgres user. The username and database name will be "postgres" |
| postgres.pvc | object | `{"accessMode":"ReadWriteOnce","size":"1Gi","storageClass":"longhorn"}` | Required: storage for the postgres database |
| postgres.pvc.size | string | `"1Gi"` | Optional: Maximum size of the database |
| postgres.pvc.storageClass | string | `"longhorn"` | Required: Specify a StorageClass where the database will be stored |
| postgres.resources.limits.cpu | string | `"2"` | Optional: Maximum resources for the postgres container |
| postgres.resources.limits.memory | string | `"4Gi"` |  |
| retrom.image.pullPolicy | string | `"Always"` |  |
| retrom.image.tag | string | `"latest"` | Optional: The version of Retrom to deploy |
| retrom.ports.backend.nodePort | int | `31110` | Optional: Port on which the service is exposed (when type is NodePort) |
| retrom.ports.frontend.nodePort | int | `31111` | Optional: Port on which the web ui is exposed (when type is NodePort) |
| retrom.replicas | int | `1` |  |
| retrom.resources.limits | object | `{"cpu":"2","memory":"4Gi"}` | Optional: Maximum resources for the postgres container |
| retrom.service | object | `{"type":"NodePort"}` | Optional: Cluster network service type |
| retrom.volumes.config | object | `{"claimName":"retrom-config","path":"<nfs_path>/config","readOnly":false,"server":"<server_ip>","size":"1Mi","storageClass":"longhorn","type":"nfs"}` | Required: Location of the config folder |
| retrom.volumes.config.claimName | string | `"retrom-config"` | Optional: Name of the PVC. No effect when type is nfs |
| retrom.volumes.config.path | string | `"<nfs_path>/config"` | Optional: NFS path. No effect when type is pvc |
| retrom.volumes.config.readOnly | bool | `false` | Optional: Whether the library is read-only. No effect when type is pvc |
| retrom.volumes.config.server | string | `"<server_ip>"` | Optional: NFS server IP. No effect when type is pvc |
| retrom.volumes.config.size | string | `"1Mi"` | Optional: Size of the PVC. No effect when type is nfs |
| retrom.volumes.config.storageClass | string | `"longhorn"` | Optional: Storage class for the PVC. No effect when type is nfs |
| retrom.volumes.config.type | string | `"nfs"` | Required: nfs or pvc |
| retrom.volumes.libraries | list | `[{"accessMode":"ReadWriteMany","claimName":"retrom-library1","mountPath":"/library1","name":"retrom-library1","path":"<nfs_path>/config","readOnly":false,"server":"<server_ip>","size":"1Mi","storageClass":"longhorn","type":"nfs"}]` | Required: Dictionary of external libraries |
| retrom.volumes.libraries[0].claimName | string | `"retrom-library1"` | Optional: Name of the PVC. No effect when type is nfs |
| retrom.volumes.libraries[0].mountPath | string | `"/library1"` | Required: Mount path within the container |
| retrom.volumes.libraries[0].path | string | `"<nfs_path>/config"` | Optional: NFS path. No effect when type is pvc |
| retrom.volumes.libraries[0].readOnly | bool | `false` | Optional: Whether the library is read-only. No effect when type is pvc |
| retrom.volumes.libraries[0].server | string | `"<server_ip>"` | Optional: NFS server IP. No effect when type is pvc |
| retrom.volumes.libraries[0].size | string | `"1Mi"` | Optional: Size of the PVC. No effect when type is nfs |
| retrom.volumes.libraries[0].storageClass | string | `"longhorn"` | Optional: Storage class for the PVC. No effect when type is nfs |
| retrom.volumes.libraries[0].type | string | `"nfs"` | Required: nfs or pvc |

## Example Values and Retrom Config
```yaml
# values.yaml

namespace: retrom

retrom:
  volumes:
    libraries:
      - name: retrom-library1
        type: nfs
        server: <server_ip>
        path: <nfs_path>/library1
        mountPath: /library1
        readOnly: false
    config:
      type: nfs
      server: <server_ip>
      path: <nfs_path>/config

postgres:
  password: please_changeme_and_maybe_try_to_use_a_kubernetes_secret_:)
  pvc:
    storageClass: longhorn
    accessMode: ReadWriteMany
    size: 1Gi
```

```json
{
    "connection": {
      "port": 5101,
      "db_url": "postgres://postgres:please_changeme_and_maybe_try_to_use_a_kubernetes_secret_:)@retrom-db.retrom.svc.cluster.local/postgres"
    },
    "content_directories": [
      {
        "path": "/library1",
        "storage_type": "MultiFileGame"
      }
    ],
    "igdb": {
      "client_secret": "super_secret_client_secret!!!1",
      "client_id": "my_IGDB_ID_1234"
    }
  }
```

## TODO:
- [ ] Allow arbitrary extra arguments
- [ ] Deployment instructions
- [ ] Testing
  - [ ] Multiple libraries
  - [ ] Retrom Replicas
  - [ ] Everything else

----------------------------------------------
Autogenerated from chart metadata using [helm-docs v1.14.2](https://github.com/norwoodj/helm-docs/releases/v1.14.2)