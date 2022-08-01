export class CustomerBasicModel {
  constructor(
    public person_type: string = "Person",
    public id_type: string = "13",
    public identification: string = "",
    public name: string[] = [],
    public address: AddressSIIGOModel = null,
    public phones: PhonesSIIGOMOdel[] = [],
    public contacts: ContactsSIIGOModel[] = []
  ) {}
}

export class AddressSIIGOModel {
  constructor(
    public address: string = "",
    public city: CitySIIGOModel = null,
    public postal_code: string = ""
  ) {}
}

export class CitySIIGOModel {
  constructor(
    public country_code: string = "",
    public country_name: string = "",
    public state_code: string = "",
    public state_name: string = "",
    public city_code: string = "",
    public city_name: string = ""
  ) {}
}

export class PhonesSIIGOMOdel {
  constructor(public number: string = "") {}
}

export class ContactsSIIGOModel {
  constructor(
    public first_name: string = "",
    public last_name: string = "",
    public email: string = "",
    public phone: PhonesSIIGOMOdel = null
  ) {}
}
