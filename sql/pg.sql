-- Table: kal.chaty

-- DROP TABLE kal.chaty;

CREATE TABLE kal.chaty
(
    id integer NOT NULL DEFAULT nextval('chatyidseq'::regclass),
    datum date NOT NULL,
    denid integer,
    kdo text COLLATE pg_catalog."default" NOT NULL,
    text text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT chaty_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE kal.chaty
    OWNER to kal;


-- Table: kal.dny

-- DROP TABLE kal.dny;

CREATE TABLE kal.dny
(
    id integer NOT NULL DEFAULT nextval('denidseq'::regclass),
    datum date NOT NULL,
    den text COLLATE pg_catalog."default" NOT NULL,
    kdo text COLLATE pg_catalog."default",
    pozn1 text COLLATE pg_catalog."default",
    pozn2 text COLLATE pg_catalog."default",
    pozn3 text COLLATE pg_catalog."default",
    ss boolean NOT NULL,
    CONSTRAINT dny_pkey PRIMARY KEY (id),
    CONSTRAINT "denUnique" UNIQUE (datum)
)

TABLESPACE pg_default;

ALTER TABLE kal.dny
    OWNER to kal;

-- Table: kal.logy

-- DROP TABLE kal.logy;

CREATE TABLE kal.logy
(
    id integer,
    typ text COLLATE pg_catalog."default",
    subtyp text COLLATE pg_catalog."default",
    text text COLLATE pg_catalog."default",
    chyba text COLLATE pg_catalog."default",
    kdo text COLLATE pg_catalog."default",
    co text COLLATE pg_catalog."default",
    cas date
)

TABLESPACE pg_default;

ALTER TABLE kal.logy
    OWNER to kal;


-- SEQUENCE: kal.chatyidseq

-- DROP SEQUENCE kal.chatyidseq;

CREATE SEQUENCE kal.chatyidseq
    INCREMENT 1
    START 4
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE kal.chatyidseq
    OWNER TO kal;


-- SEQUENCE: kal.denidseq

-- DROP SEQUENCE kal.denidseq;

CREATE SEQUENCE kal.denidseq
    INCREMENT 1
    START 12
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE kal.denidseq
    OWNER TO kal;
