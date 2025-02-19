import { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Contenedor, GroupButtons, GroupActions } from "./styled";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { Dropdown } from "primereact/dropdown";
import { User } from "../../types";
import { listUsers, userDeleteId } from "./../../servicios/users";
import { addUser } from "./../../servicios/users";
import { Calendar } from "primereact/calendar";
import { PrimeIcons } from "primereact/api";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";

export function Home() {
  const [valueUserId, setValueUserId] = useState<number | null>(null);

  const gender = ["female", "male"];
  const [customers, setCustomers] = useState<User[]>([]);
  const [valueAge, setValueAge] = useState(18);
  const [valueGender, setGender] = useState("");
  const [valueFirstName, setValueFirstName] = useState("");
  const [valueLastName, setValueLastName] = useState("");
  const [valueMaidenName, setValueMaidenName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  const [valueDate, setDate] = useState<Date | null>(null);
  const [valueUserName, setValueUserName] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  const [visibleBank, setVisibleBank] = useState<boolean>(false);
  const [bankData, setBankData] = useState<User["bank"] | null>(null); // es de la propiedad bank de user, y puede traer null, sino me marca error
  const [addressData, setAddressData] = useState<User["address"] | null>(null);
  const [visibleAddress, setVisibleAddress] = useState<boolean>(false);

  const cuentaBancaria = (user: User) => {
    if (user.bank) {
      setBankData(user.bank);
      setVisibleBank(true);
    } else {
      console.log("El usuario no tiene datos bancarios");
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => setVisibleBank(false)}
        autoFocus
      />
    </div>
  );

  const dataAddress = (user: User) => {
    if (user.bank) {
      setAddressData(user.address);
      setVisibleAddress(true);
    } else {
      console.log("El usuario no tiene datos bancarios");
    }
  };

  const footerContent2 = (
    <div>
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => setVisibleAddress(false)}
        autoFocus
      />
    </div>
  );

  const editUser = (user: User) => {
    setValueUserId(user.id ?? null); //este no muestro, lo agarro
    setValueFirstName(user.firstName);
    setValueLastName(user.lastName);
    setValueMaidenName(user.maidenName || "");
    setValueAge(user.age || 18);
    setGender(user.gender);
    setValueEmail(user.email);
    setValuePhone(user.phone || "");
    setDate(user.birthDate ? new Date(user.birthDate) : null); // si user.birthDate tiene valor, new Date lo convierte en tipo Date, y si esta vacio queda tipo null
    setValueUserName(user.username || "");
    setValuePassword(user.password || "");
  };

  const deleteUserFromList = async (id: number) => {
    try {
      const deletedUser = await userDeleteId(id); //elimino el user
      if (deletedUser) {
        setCustomers(customers.filter((user) => user.id !== id)); // filtro la lista con el usuario ya eliminado
      }
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const handleCancel = () => {
    setValueFirstName("");
    setValueLastName("");
    setValueMaidenName("");
    setValueAge(18);
    setGender("");
    setValueEmail("");
    setValuePhone("");
    setDate(null);
    setValueUserName("");
    setValuePassword("");
  };

  const handleDelete = () => {
    if (valueUserId !== null) { // si el valor del id no es null
      deleteUserFromList(valueUserId); // borro el usuario mediante el id y filtro lista
      setValueUserId(null); // lo reseto en null
      handleCancel(); // y vacio los inputs
    } else {
      console.log("No hay tal usuario para borrar");
    }
  };

  const handleSubmit = async () => {
    const userRegistrarion: User = {
      firstName: valueFirstName,
      lastName: valueLastName,
      maidenName: valueMaidenName,
      age: valueAge,
      gender: valueGender,
      email: valueEmail,
      phone: valuePhone || "",
      birthDate: valueDate ?? undefined,
      username: valueUserName,
      password: valuePassword,
    };

    const newUser = await addUser(userRegistrarion); //esperando el nuevo usuario agregado a la lista
    if (newUser) {
      //si hay nuevo usuario es true, si me devuelve undefined es false
      console.log("Usuario agregago", newUser);
      // setCustomers([newUser, ...customers]) //agrego nuevo usuario a la lista de usuario
      // listUsers().then((users) => setCustomers(users || []));
    }
  };

  useEffect(() => {
    listUsers().then((users) => setCustomers(users || []));
  }, []);

  return (
    <>
      <div>
        <p>Datos de la persona</p>
      </div>
      <Contenedor>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="FirstName"
            variant="filled"
            value={valueFirstName}
            onChange={(e) => setValueFirstName(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="LastName"
            variant="filled"
            value={valueLastName}
            onChange={(e) => setValueLastName(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="maidenName"
            variant="filled"
            value={valueMaidenName}
            onChange={(e) => setValueMaidenName(e.target.value)}
          />
        </div>
        <div>
          <InputNumber
            inputId="minmax-buttons"
            value={valueAge}
            onValueChange={(e) => setValueAge(e.value || 0)}
            mode="decimal"
            showButtons
            min={0}
            max={100}
            inputStyle={{ width: "100%" }}
          />
        </div>
        <div>
          <Dropdown
            value={valueGender}
            onChange={(e) => setGender(e.value)}
            options={gender}
            optionLabel="gender"
            placeholder="gender"
            className="w-full md:w-14rem"
            style={{ width: "100%" }}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="email"
            variant="filled"
            value={valueEmail}
            onChange={(e) => setValueEmail(e.target.value)}
          />
        </div>

        <div className="flex-auto">
          <label htmlFor="withoutgrouping" className="font-bold block mb-2" />
          <InputText
            placeholder="phone"
            variant="filled"
            value={valuePhone}
            onChange={(e) => setValuePhone(e.target.value)}
          />
        </div>

        <div className="card flex justify-content-center">
          <Calendar
            placeholder="birthDate"
            variant="filled"
            value={valueDate}
            onChange={(e) => setDate(e.value as Date | null)} //asi no me marca error
            dateFormat="dd/mm/yy"
          />
        </div>

        <div className="card flex justify-content-center">
          <InputText
            placeholder="userName"
            variant="filled"
            value={valueUserName}
            onChange={(e) => setValueUserName(e.target.value)}
          />
        </div>

        <div className="card flex justify-content-center">
          <InputText
            placeholder="password"
            variant="filled"
            value={valuePassword}
            onChange={(e) => setValuePassword(e.target.value)}
          />
        </div>
      </Contenedor>
      <GroupButtons>
        <ButtonGroup>
          <Button label="Save" onClick={handleSubmit} icon="pi pi-check" />
          <Button label="Delete" icon="pi pi-trash" onClick={handleDelete} />
          <Button label="Cancel" icon="pi pi-times" onClick={handleCancel} />
        </ButtonGroup>
      </GroupButtons>
      <DataTable
        value={customers}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
      >
        <Column field="id" header="Id" style={{ width: "10%" }} />
        <Column field="firstName" header="firstName" style={{ width: "15%" }} />
        <Column field="lastName" header="lastName" style={{ width: "15%" }} />
        <Column field="email" header="Email" style={{ width: "25%" }} />
        <Column field="phone" header="phone" style={{ width: "20%" }} />
        <Column
          field="actions"
          header="actions"
          style={{ width: "15%" }}
          body={(user) => (
            <>
              <GroupActions>
                <Button
                  icon={PrimeIcons.USER_EDIT}
                  onClick={() => editUser(user)}
                />
                <Button
                  icon={PrimeIcons.TRASH}
                  onClick={() => deleteUserFromList(user.id)}
                />

                <Button
                  icon={PrimeIcons.BOOK}
                  onClick={() => dataAddress(user)}
                />

                <Button
                  icon={PrimeIcons.BUILDING}
                  onClick={() => cuentaBancaria(user)}
                />
              </GroupActions>
            </>
          )}
        />
      </DataTable>
      <Dialog
        header="Datos Bancarios"
        visible={visibleAddress}
        footer={footerContent2}
        style={{ width: "50vw" }}
        onHide={() => setVisibleAddress(false)}
      >
        {addressData ? (
          <div>
            <p>Address: {addressData.address}</p>
            <p>City: {addressData.city}</p>
            <p>
              Coordinates: {addressData.coordinates.ing}
              {addressData.coordinates.lat}
            </p>
            <p>Country: {addressData.country}</p>
            <p>Postal Code: {addressData.postalCode} </p>
            <p>State: {addressData.state} </p>
            <p>State code: {addressData.stateCode} </p>
          </div>
        ) : (
          <p>El usuario no tiene datos bancarios</p>
        )}
      </Dialog>
      <Dialog
        header="Datos Bancarios"
        visible={visibleBank}
        footer={footerContent}
        style={{ width: "50vw" }}
        onHide={() => setVisibleBank(false)}
      >
        {bankData ? (
          <div>
            <p>Card Expire: {bankData.cardExpire}</p>
            <p>Card Number: {bankData.cardNumber}</p>
            <p>Card Type: {bankData.cardType}</p>
            <p>Currency: {bankData.currency}</p>
            <p>Iban: {bankData.iban}</p>
          </div>
        ) : (
          <p>El usuario no tiene datos bancarios</p>
        )}
      </Dialog>
    </>
  );
}

export default Home;
