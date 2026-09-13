import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

// Patch AngularFirestoreCollection.prototype.doc to run in injection context.
// AngularFire compat v20/v21 has AngularFirestoreDocument calling inject(EnvironmentInjector)
// at class property level, which throws NG0203 when .doc() is called outside an injection context.
const originalDoc = AngularFirestoreCollection.prototype.doc;
AngularFirestoreCollection.prototype.doc = function<T2>(this: AngularFirestoreCollection<unknown>, path?: string): AngularFirestoreDocument<T2> {
  const collectionWithInjector = this as unknown as { injector?: EnvironmentInjector };
  if (collectionWithInjector.injector) {
    return runInInjectionContext(collectionWithInjector.injector, () => originalDoc.call(this, path)) as unknown as AngularFirestoreDocument<T2>;
  }
  return originalDoc.call(this, path) as unknown as AngularFirestoreDocument<T2>;
};
