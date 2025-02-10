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

export function Home() {
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const genero = ["Female", "Male"];

  const [customers, setCustomers] = useState<User[]>([]);
  const [valueAge, setValueAge] = useState(18);
  const [valueGender, setGender] = useState("genero");
  const [valueFirstName, setValueFirstName] = useState("");
  const [valueLastName, setValueLastName] = useState("");
  const [valueMaidenName, setValueMaidenName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePhone, setValuePhone] = useState(); 
  const [valueBirthDate, setValueBirthDate] = useState("");
  const [valueUserName, setValueUserName] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  const handleSubmit = async () => {
    const userRegistrarion = {
      age: valueAge,
      gender: valueGender,
      firstName: valueFirstName,
      lastName: valueLastName,
      maidenName: valueMaidenName,
      email: valueEmail,
      phone: valuePhone || 0,
      birthDate: valueBirthDate,
      userName: valueUserName,
      password: valuePassword,
    };

    const newUser = await addUser(userRegistrarion);
    if (newUser) {
      console.log("Usuario agregago", newUser);
      customers.push(newUser); //agrego nuevo usuario a la lista de usuario
      return;
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
          optionLabel="genero"
          placeholder="genero"
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
          <InputNumber
            placeholder="phone"
            variant="filled"
            inputId="withoutgrouping"
            value={valuePhone}
            onValueChange={(e) => setValuePhone(e.value)} // me marca error el value
            useGrouping={false}
          />
        </div>
        
        <div className="card flex justify-content-center">
          <InputText
            placeholder="birthDate"
            variant="filled"
            value={valueBirthDate}
            onChange={(e) => setValueBirthDate(e.target.value)}
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
