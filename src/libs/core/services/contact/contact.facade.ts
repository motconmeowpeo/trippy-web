import {
  addEntities,
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  updateEntities,
} from '@ngneat/elf-entities';
import { store } from './contact.store';
import { filter, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { IBaseParams, ICreateContact } from '@core/model';
import { ContactService } from './contact.service';
import { ContactStatus } from '../../enum/contact.enum';

@Injectable({ providedIn: 'root' })
export class ContactFacade {
  contacts$ = store.pipe(selectAllEntities());
  contact$ = store.pipe(
    selectActiveEntity(),
    filter((contact) => !!contact)
  );
  constructor(private contactService: ContactService) {}

  createContact(payload: Partial<ICreateContact>) {
    return this.contactService
      .createContact(payload)
      .pipe(tap((contact) => store.update(addEntities(contact))));
  }

  getAllContactByManager(params?: IBaseParams) {
    return this.contactService
      .getAllContactByManager(params)
      .pipe(tap((contacts) => store.update(setEntities(contacts))));
  }

  changeStatus(id: string, status: ContactStatus) {
    return this.contactService
      .changeStatusCOntact(id, status)
      .pipe(
        tap((contact) => store.update(updateEntities(contact.id, contact)))
      );
  }

  getContactNews(id: string) {
    return this.contactService
      .getContactNews(id)
      .pipe(tap((contact) => store.update(setEntities(contact))));
  }
}
