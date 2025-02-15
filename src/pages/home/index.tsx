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

export function Home() {
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;

  const [valueAge, setValueAge] = useState("18");
  const [value, setValue] = useState("");
  const [customers, setCustomers] = useState<User[]>([]);

  const [gender, setGender] = useState(null);
  const genero = ["Female", "Male"];

  useEffect(() => {
    listUsers().then((users)=> setCustomers(users || []));
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
          onValueChange={(e) => setValueAge(e.value)}
          mode="decimal"
          showButtons
          min={0}
          max={100}
        />

        <Dropdown
          value={gender}
          onChange={(e) => setGender(e.value)}
          options={genero}
          optionLabel="name"
          placeholder="genero"
          className="w-full md:w-14rem"
        />

        <div className="card flex justify-content-center">
          <InputText
            placeholder="Usenarme"
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="FirstName"
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="maidenName"
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="email"
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="phone"
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="birthDate"
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="userName"
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="card flex justify-content-center">
          <InputText
            placeholder="password"
            variant="filled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </Contenedor>
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
