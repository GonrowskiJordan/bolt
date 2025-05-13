# Savii Benefits Portal - Entity Relationship Diagram

Below is a comprehensive Entity Relationship Diagram (ERD) for the Savii Benefits Portal application in PlantUML format. This can be visualized by copying the code into a PlantUML renderer.

```plantuml
@startuml Savii Benefits Portal ERD

!define TABLE_BORDER_COLOR #073B4C
!define ENTITY_COLOR #118AB2
!define PRIMARY_KEY_COLOR #EF476F
!define FOREIGN_KEY_COLOR #FFD166
!define ATTRIBUTE_COLOR #06D6A0

skinparam class {
    BackgroundColor ENTITY_COLOR
    BorderColor TABLE_BORDER_COLOR
    ArrowColor TABLE_BORDER_COLOR
    AttributeFontColor white
    AttributeFontSize 12
    AttributeIconSize 12
}

' Entities

entity "users (auth.users)" as users {
    *id : uuid <<PK>> 
    --
    email : text
    encrypted_password : text
    confirmed_at : timestamp
    created_at : timestamp
    updated_at : timestamp
    role : text
    first_name : text
    last_name : text
    phone : text
}

entity "organizations" as organizations {
    *id : uuid <<PK>>
    --
    name : text
    industry : text
    size : text
    status : text
    tax_id : text
    address : text
    city : text
    state : text
    zip_code : text
    phone : text
    email : text
    website : text
    created_at : timestamp
    updated_at : timestamp
}

entity "organization_users" as organization_users {
    *id : uuid <<PK>>
    *organization_id : uuid <<FK>>
    *user_id : uuid <<FK>>
    --
    role : text
    created_at : timestamp
    updated_at : timestamp
}

entity "employees" as employees {
    *id : uuid <<PK>>
    *organization_id : uuid <<FK>>
    *user_id : uuid <<FK>>
    --
    first_name : text
    last_name : text
    middle_name : text
    biological_gender : text
    date_of_birth : date
    email_address : text
    address : text
    zip_code : text
    phone_number : text
    tobacco_user : boolean
    brand_unit : text
    store_number : text
    county : text
    home_city : text
    average_hours_per_week : numeric
    hourly_rate : numeric
    annual_wages : numeric
    pay_type : text
    job_title : text
    employee_ref : text
    employee_class : text
    worksite_identifier : text
    worksite_address : text
    relationship : text
    current_employee_status : text
    created_at : timestamp
    updated_at : timestamp
}

entity "enrollment_periods" as enrollment_periods {
    *id : uuid <<PK>>
    *organization_id : uuid <<FK>>
    --
    year : text
    name : text
    open_date : timestamp
    open_time : time
    close_date : timestamp
    close_time : time
    effective_date : date
    loss_of_coverage_date : date
    current_group_carrier : text
    status : text
    created_at : timestamp
    updated_at : timestamp
}

entity "employee_enrollments" as employee_enrollments {
    *id : uuid <<PK>>
    *employee_id : uuid <<FK>>
    *enrollment_period_id : uuid <<FK>>
    --
    status : text
    current_stipend : numeric
    current_monthly_premium : numeric
    created_at : timestamp
    updated_at : timestamp
}

entity "attestations" as attestations {
    *id : uuid <<PK>>
    *user_id : uuid <<FK>>
    --
    status : text
    created_at : timestamp
    updated_at : timestamp
    plan_year : text
    metadata : jsonb
}

entity "plans" as plans {
    *id : uuid <<PK>>
    --
    carrier_id : uuid
    name : text
    type : text
    tier : text
    network : text
    premium_amount : numeric
    deductible : numeric
    out_of_pocket_max : numeric
    coverage_level : text
    created_at : timestamp
    updated_at : timestamp
}

entity "plan_selections" as plan_selections {
    *id : uuid <<PK>>
    *employee_id : uuid <<FK>>
    *plan_id : uuid <<FK>>
    *enrollment_period_id : uuid <<FK>>
    --
    premium_amount : numeric
    stipend_amount : numeric
    coverage_level : text
    effective_date : date
    end_date : date
    status : text
    created_at : timestamp
    updated_at : timestamp
}

entity "family_members" as family_members {
    *id : uuid <<PK>>
    *employee_id : uuid <<FK>>
    --
    first_name : text
    middle_name : text
    last_name : text
    relationship : text
    date_of_birth : date
    gender : text
    ssn : text
    tobacco_user : boolean
    created_at : timestamp
    updated_at : timestamp
}

entity "documents" as documents {
    *id : uuid <<PK>>
    *organization_id : uuid <<FK>>
    --
    name : text
    type : text
    category : text
    content_type : text
    size : numeric
    path : text
    shared : boolean
    created_at : timestamp
    updated_at : timestamp
    created_by : uuid
}

' Relationships

users ||--o{ organization_users
organizations ||--o{ organization_users
organizations ||--o{ employees
organizations ||--o{ enrollment_periods
organizations ||--o{ documents

users ||--o{ attestations
users ||--o{ employees

employees ||--o{ employee_enrollments
employees ||--o{ plan_selections
employees ||--o{ family_members

enrollment_periods ||--o{ employee_enrollments
enrollment_periods ||--o{ plan_selections

plans ||--o{ plan_selections

@enduml
```

## Entity Descriptions

### users
Central user table handled by Supabase Auth. Contains authentication information and basic user profile data for all system users.

### organizations
Represents employer organizations in the system. Contains organization details, contact information, and status.

### organization_users
Junction table connecting users to organizations with specific roles (admin, employee, etc.).

### employees
Detailed employee records with personal and employment information. Connected to both organizations and users.

### enrollment_periods
Defines enrollment windows for organizations, including open/close dates and status.

### employee_enrollments
Tracks each employee's enrollment status and financial details for specific enrollment periods.

### attestations
Records employee opt-in/opt-out decisions for ICHRA benefits. Contains a status field and metadata for additional information.

### plans
Available insurance plans with details about coverage, costs, and classifications.

### plan_selections
Records which plans employees have selected during specific enrollment periods.

### family_members
Stores information about employees' dependents and spouses who may be covered under their plans.

### documents
Stores metadata about documents in the system, with references to organizations for access control.

## Key Relationships

1. **Organizations to Employees**: One-to-many (an organization has many employees)
2. **Users to Employees**: One-to-one (each employee record is linked to a user account)
3. **Organizations to Enrollment Periods**: One-to-many (an organization can have multiple enrollment periods)
4. **Employees to Family Members**: One-to-many (an employee can have multiple family members)
5. **Employees to Plan Selections**: One-to-many (an employee can have multiple plan selections over time)
6. **Enrollment Periods to Plan Selections**: One-to-many (many plan selections can be made during an enrollment period)
7. **Plans to Plan Selections**: One-to-many (a plan can be selected by multiple employees)