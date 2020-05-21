
CREATE SEQUENCE kal.chatyidseq
    INCREMENT 1
    START 4
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;


CREATE SEQUENCE kal.denidseq
    INCREMENT 1
    START 12
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;



CREATE TABLE kal.chaty
(
    id integer NOT NULL DEFAULT nextval('kal.chatyidseq'::regclass),
    datum date NOT NULL,
    denid integer,
    kdo text COLLATE pg_catalog."default" NOT NULL,
    text text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT chaty_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;


-- Table: kal.dny

-- DROP TABLE kal.dny;

CREATE TABLE kal.dny
(
    id integer NOT NULL DEFAULT nextval('kal.denidseq'::regclass),
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
    OWNER to kblwfosqcpwqon;

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
