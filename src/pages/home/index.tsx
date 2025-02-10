import { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Contenedor } from "./styled";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { User } from "../../types";
import { listUsers } from "./../../servicios/users";
import { addUser } from "./../../servicios/users";
import { Calendar } from "primereact/calendar";

export function Home() {
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const genero = ["Female", "Male"];

  const [customers, setCustomers] = useState<User[]>([]);
  const [valueAge, setValueAge] = useState(18);
  const [valueGender, setGender] = useState("");
  const [valueFirstName, setValueFirstName] = useState("");
  const [valueLastName, setValueLastName] = useState("");
  const [valueMaidenName, setValueMaidenName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePhone, setValuePhone] = useState("");
  const [valueDate, setDate] = useState<Date | undefined>(undefined);
  const [valueUserName, setValueUserName] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  const handleSubmit = async () => {
    const userRegistrarion: User = {
      age: valueAge,
      gender: valueGender,
      firstName: valueFirstName,
      lastName: valueLastName,
      maidenName: valueMaidenName,
      email: valueEmail,
      phone: valuePhone || "",
      birthDate: valueDate,
      username: valueUserName,
      password: valuePassword,
    };

    const newUser = await addUser(userRegistrarion); //esperando el nuevo usuario agregado a la lista
    if (newUser) {
      //si hay nuevo usuario es true, si me devuelve undefined es false
      console.log("Usuario agregago", newUser);
      //setCustomers([newUser, ...customers]) //agrego nuevo usuario a la lista de usuario
      listUsers().then((users) => setCustomers(users || []));
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
        <InputNumber
          inputId="minmax-buttons"
          value={valueAge}
          onValueChange={(e) => setValueAge(e.value || 0)}
          mode="decimal"
          showButtons
          min={0}
          max={100}
        />

        <Dropdown
          value={valueGender}
          onChange={(e) => setGender(e.value)}
          options={genero}
          optionLabel="Genero"
          placeholder="Genero"
          className="w-full md:w-14rem"
        />

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
            value={valueDate}
            onChange={(e) => setDate(e.value || undefined)}
            dateFormat="dd/mm/yy"
          />
        </div>

        <div className="card flex justify-content-center">
          <InputText
            placeholder="Usenarme"
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
      <div className="card flex justify-content-center">
        <Button label="Submit" onClick={handleSubmit} />
      </div>
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
        <Column field="id" header="Id" style={{ width: "20%" }}></Column>
        <Column
          field="firstName"
          header="firstName"
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="lastName"
          header="lastName"
          style={{ width: "20%" }}
        ></Column>
        <Column field="email" header="Email" style={{ width: "20%" }}></Column>
        <Column field="phone" header="phone" style={{ width: "20%" }}></Column>
      </DataTable>
    </>
  );
}

export default Home;
