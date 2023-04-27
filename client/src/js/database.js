import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Creating connection to the database and version
  const jateDb = await openDB('jate', 1);
  // Creating new transaction and establishing read and write privileges
  const transaction = jateDb.transaction('jate', 'readwrite');
  // Opening the jate object store
  const store = transaction.objectStore('jate');
  // Adding content to jate
  const addContent = store.add( {text: content});
  // Confirming content was added
  const result = await addContent
  console.log('New Content has been added', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
