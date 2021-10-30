-- Database: kmcollaborator

-- DROP DATABASE kmcollaborator;

CREATE DATABASE kmcollaborator
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       template template0
       TABLESPACE = pg_default
       LC_COLLATE = 'Portuguese_Brazil.1252'
       LC_CTYPE = 'Portuguese_Brazil.1252'
       CONNECTION LIMIT = -1;


--------------- SQL ---------------

CREATE TABLE public.perguntas (
  id_perguntas SERIAL NOT NULL,
  conteudo VARCHAR(50) NOT NULL,
  tipo_resposta VARCHAR(10),
  status VARCHAR(1),
  id_responsavel INTEGER,
  senioridade VARCHAR(20),
  id_departamento INTEGER,
  PRIMARY KEY(id_perguntas)
) 
WITH (oids = false);

--------------- SQL ---------------

CREATE TABLE public.respostas (
  id_respostas SERIAL NOT NULL,
  id_perguntas INTEGER,
  descricao VARCHAR,
  correta VARCHAR(1),
  PRIMARY KEY(id_respostas)
) 
WITH (oids = false);

--------------- SQL ---------------

ALTER TABLE public.respostas
  ADD CONSTRAINT respostas_fk FOREIGN KEY (id_perguntas)
    REFERENCES public.perguntas(id_perguntas)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
    --------------- SQL ---------------

ALTER TABLE public.perguntas
  ADD COLUMN nota REAL;
  --------------- SQL ---------------

ALTER TABLE public.perguntas
  ADD COLUMN nivel VARCHAR(1);
  --------------- SQL ---------------

ALTER TABLE public.perguntas
  DROP COLUMN nota;
  --------------- SQL ---------------

ALTER TABLE public.perguntas
  ALTER COLUMN conteudo TYPE VARCHAR(500) COLLATE pg_catalog."default";

  --------------- SQL ---------------

ALTER TABLE public.respostas
  ALTER COLUMN descricao SET NOT NULL;

  --------------- SQL ---------------

ALTER TABLE public.respostas
  ALTER COLUMN id_perguntas SET NOT NULL;
  --------------- SQL ---------------

CREATE TABLE public.avalicoes (
  id_avalicoes SERIAL NOT NULL,
  id_perguntas INTEGER,
  titulo VARCHAR(100),
  tempo TIME WITHOUT TIME ZONE,
  PRIMARY KEY(id_avalicoes)
) 
WITH (oids = false);
--------------- SQL ---------------

ALTER TABLE public.avalicoes
  ADD COLUMN id_usuario INTEGER;

COMMENT ON COLUMN public.avalicoes.id_usuario
IS 'Usuario que criou a avaliação';

--------------- SQL ---------------

CREATE TABLE public.usuario (
  id_usuario SERIAL NOT NULL,
  login VARCHAR(50),
  senha VARCHAR(100),
  nome_completo VARCHAR(50),
  email VARCHAR(50),
  administrador BOOLEAN,
  PRIMARY KEY(id_usuario)
) 
WITH (oids = false);

--------------- SQL ---------------

ALTER TABLE public.usuario
  ALTER COLUMN login SET NOT NULL;

ALTER TABLE public.usuario
  ADD UNIQUE (login);
  --------------- SQL ---------------

ALTER TABLE public.usuario
  ALTER COLUMN senha SET NOT NULL;

  --------------- SQL ---------------

ALTER TABLE public.usuario
  ALTER COLUMN nome_completo SET NOT NULL;

  --------------- SQL ---------------

ALTER TABLE public.usuario
  ALTER COLUMN administrador SET DEFAULT FALSE;

ALTER TABLE public.usuario
  ALTER COLUMN administrador SET NOT NULL;
--------------- SQL ---------------

CREATE TABLE public.grupo (
  id_grupo SERIAL NOT NULL,
  nome VARCHAR(50) NOT NULL,
  PRIMARY KEY(id_grupo)
) 
WITH (oids = false);

--------------- SQL ---------------

CREATE TABLE public.usuario_grupo (
  id_usuario_grupo SERIAL NOT NULL,
  id_usuario INTEGER,
  id_grupo INTEGER,
  PRIMARY KEY(id_usuario_grupo)
) 
WITH (oids = false);

--------------- SQL ---------------

ALTER TABLE public.avalicoes
  ADD CONSTRAINT avalicoes_fk FOREIGN KEY (id_perguntas)
    REFERENCES public.perguntas(id_perguntas)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

    --------------- SQL ---------------

ALTER TABLE public.perguntas
  ADD CONSTRAINT perguntas_fk FOREIGN KEY (id_responsavel)
    REFERENCES public.usuario(id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

--------------- SQL ---------------

CREATE TABLE public.departamento (
  id_departamento SERIAL NOT NULL,
  nome VARCHAR,
  PRIMARY KEY(id_departamento)
) 
WITH (oids = false);

ALTER TABLE public.perguntas
  ADD CONSTRAINT perguntas_fk1 FOREIGN KEY (id_departamento)
    REFERENCES public.departamento(id_departamento)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
    --------------- SQL ---------------

ALTER TABLE public.avalicoes
  ADD CONSTRAINT avalicoes_fk1 FOREIGN KEY (id_usuario)
    REFERENCES public.usuario(id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

    --------------- SQL ---------------

ALTER TABLE public.usuario_grupo
  ADD CONSTRAINT usuario_grupo_fk FOREIGN KEY (id_usuario)
    REFERENCES public.usuario(id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

    --------------- SQL ---------------

ALTER TABLE public.usuario_grupo
  ADD CONSTRAINT usuario_grupo_fk1 FOREIGN KEY (id_grupo)
    REFERENCES public.grupo(id_grupo)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

    --------------- SQL ---------------

CREATE TABLE public.profissional (
  id_profissional SERIAL NOT NULL,
  nome_completo VARCHAR(50) NOT NULL,
  cpf VARCHAR(13),
  endereco VARCHAR(100),
  bairro VARCHAR(50),
  complementar VARCHAR(100),
  data_nascimento DATE,
  telefone VARCHAR(20),
  celular VARCHAR(20),
  cargo VARCHAR(50),
  id_departamento INTEGER,
  nivel_senioridade VARCHAR(1) DEFAULT 'J',
  id_usuario INTEGER,
  PRIMARY KEY(id_profissional)
) 
WITH (oids = false);

COMMENT ON COLUMN public.profissional.nivel_senioridade
IS '''J'' : Junior
''P'' : Pleno
''s'' : Senior';

--------------- SQL ---------------

ALTER TABLE public.profissional
  ADD CONSTRAINT profissional_fk FOREIGN KEY (id_departamento)
    REFERENCES public.departamento(id_departamento)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
    --------------- SQL ---------------

ALTER TABLE public.profissional
  ADD CONSTRAINT profissional_fk1 FOREIGN KEY (id_usuario)
    REFERENCES public.usuario(id_usuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

    --------------- SQL ---------------

CREATE TABLE public.itens_avaliacoes (
  itens_avaliacoes SERIAL NOT NULL,
  id_perguntas INTEGER,
  id_avaliacoes INTEGER,
  nota_pergunta REAL,
  id_profissional INTEGER,
  nota_profissional REAL,
  PRIMARY KEY(itens_avaliacoes)
) 
WITH (oids = false);
--------------- SQL ---------------

ALTER TABLE public.itens_avaliacoes
  ADD CONSTRAINT itens_avaliacoes_fk FOREIGN KEY (id_perguntas)
    REFERENCES public.perguntas(id_perguntas)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
    --------------- SQL ---------------

ALTER TABLE public.itens_avaliacoes
  ADD CONSTRAINT itens_avaliacoes_fk1 FOREIGN KEY (id_avaliacoes)
    REFERENCES public.avalicoes(id_avalicoes)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
    --------------- SQL ---------------

ALTER TABLE public.itens_avaliacoes
  ADD CONSTRAINT itens_avaliacoes_fk2 FOREIGN KEY (id_profissional)
    REFERENCES public.profissional(id_profissional)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

    --------------- SQL ---------------

ALTER TABLE public.avalicoes
  RENAME TO avaliacoes;

  --------------- SQL ---------------

ALTER TABLE public.avalicoes_id_avalicoes_seq
  RENAME TO avaliacoes_id_avaliacoes_seq;

  --------------- SQL ---------------

ALTER TABLE public.avaliacoes
  RENAME COLUMN id_avalicoes TO id_avaliacoes;

  --------------- SQL ---------------

ALTER TABLE public.avaliacoes
  DROP COLUMN id_perguntas;

  --------------- SQL ---------------

ALTER TABLE public.itens_avaliacoes
  ADD COLUMN situacao VARCHAR(1);

ALTER TABLE public.itens_avaliacoes
  ALTER COLUMN situacao SET DEFAULT 'A';
  --------------- SQL ---------------

ALTER TABLE public.itens_avaliacoes
  ALTER COLUMN situacao DROP DEFAULT;

ALTER TABLE public.itens_avaliacoes
  ALTER COLUMN situacao TYPE VARCHAR(2) COLLATE pg_catalog."default";

ALTER TABLE public.itens_avaliacoes
  ALTER COLUMN situacao SET DEFAULT 'A'::character varying;
  --------------- SQL ---------------

ALTER TABLE public.usuario
  ADD COLUMN data_cadastro TIMESTAMP(0) WITHOUT TIME ZONE;

  --------------- SQL ---------------

ALTER TABLE public.usuario
  ALTER COLUMN administrador DROP DEFAULT;

ALTER TABLE public.usuario
  ALTER COLUMN administrador TYPE VARCHAR(1) COLLATE pg_catalog."default";

ALTER TABLE public.usuario
  ALTER COLUMN administrador SET DEFAULT 'N'::character varying;

  --------------- SQL ---------------

ALTER TABLE public.avaliacoes
  ADD COLUMN id_departamento INTEGER;
  --------------- SQL ---------------

ALTER TABLE public.avaliacoes
  ADD CONSTRAINT avaliacoes_fk FOREIGN KEY (id_departamento)
    REFERENCES public.departamento(id_departamento)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
    --------------- SQL ---------------

ALTER TABLE public.departamento
  ALTER COLUMN nome TYPE VARCHAR(50) COLLATE pg_catalog."default";

  --------------- SQL ---------------
  -- Column: data_cadastro

-- ALTER TABLE public.profissional DROP COLUMN data_cadastro;

ALTER TABLE public.profissional ADD COLUMN data_cadastro timestamp(0) without time zone;

  --------------- SQL ---------------

ALTER TABLE public.profissional
  ALTER COLUMN data_cadastro TYPE TIMESTAMP(0) WITHOUT TIME ZONE;
  
  --------------- SQL ---------------

CREATE TABLE public.correcao (
  id_correcao SERIAL,
  id_pergutas INTEGER,
  id_profissional INTEGER,
  id_resposta INTEGER,
  id_avaliacao INTEGER,
  nota REAL,
  PRIMARY KEY(id_correcao)
) 
WITH (oids = false);

--------------- SQL ---------------

ALTER TABLE public.correcao
  ADD CONSTRAINT correcao_fk FOREIGN KEY (id_pergutas)
    REFERENCES public.perguntas(id_perguntas)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
	
	--------------- SQL ---------------

ALTER TABLE public.correcao
  ADD CONSTRAINT correcao_fk1 FOREIGN KEY (id_profissional)
    REFERENCES public.profissional(id_profissional)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
	
	--------------- SQL ---------------

ALTER TABLE public.correcao
  ADD CONSTRAINT correcao_fk2 FOREIGN KEY (id_resposta)
    REFERENCES public.respostas(id_respostas)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
	
--------------- SQL ---------------

ALTER TABLE public.correcao
  ADD CONSTRAINT correcao_fk3 FOREIGN KEY (id_avaliacao)
    REFERENCES public.avaliacoes(id_avaliacoes)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
	
	--------------- SQL ---------------

ALTER TABLE public.correcao
  ADD COLUMN situacao VARCHAR(1);

ALTER TABLE public.correcao
  ALTER COLUMN situacao SET DEFAULT 'A';

COMMENT ON COLUMN public.correcao.situacao
IS 'A: aberto para correcao
C: Correrido';

--------------- SQL ---------------

ALTER TABLE public.correcao
  ADD COLUMN data_correcao TIMESTAMP(0) WITHOUT TIME ZONE;
  
  --------------- SQL ---------------

ALTER TABLE public.respostas
  ALTER COLUMN descricao DROP NOT NULL;
  --------------- SQL ---------------

ALTER TABLE public.correcao
  DROP CONSTRAINT correcao_fk2 RESTRICT;
  
  --------------- SQL ---------------

ALTER TABLE public.correcao
  ADD COLUMN resposta_aberta VARCHAR;
  --------------- SQL ---------------

ALTER TABLE public.correcao
  RENAME COLUMN resposta_aberta TO resposta;
  --------------- SQL ---------------

ALTER TABLE public.correcao
  RENAME COLUMN id_pergutas TO id_perguntas;
  --------------- SQL ---------------

ALTER TABLE public.correcao
  ALTER COLUMN id_perguntas SET NOT NULL;
  --------------- SQL ---------------

ALTER TABLE public.correcao
  ALTER COLUMN id_profissional SET NOT NULL;
  
  --------------- SQL ---------------

ALTER TABLE public.correcao
  ALTER COLUMN id_avaliacao SET NOT NULL;
ALTER TABLE public.correcao
  DROP COLUMN nota;
ALTER TABLE public.correcao
  DROP COLUMN id_resposta;
ALTER TABLE public.correcao
  DROP COLUMN id_perguntas;
ALTER TABLE public.correcao
  DROP COLUMN resposta;
  --------------- SQL ---------------

CREATE TABLE public.itens_correcao (
  id_itens_correcao SERIAL NOT NULL,
  id_correcao INTEGER,
  id_pergutas INTEGER,
  id_resposta INTEGER,
  nota REAL,
  PRIMARY KEY(id_itens_correcao)
) 
WITH (oids = false);

--------------- SQL ---------------

ALTER TABLE public.itens_correcao
  ADD CONSTRAINT itens_correcao_fk FOREIGN KEY (id_correcao)
    REFERENCES public.correcao(id_correcao)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;
    --------------- SQL ---------------

ALTER TABLE public.itens_correcao
  ADD CONSTRAINT itens_correcao_fk1 FOREIGN KEY (id_pergutas)
    REFERENCES public.perguntas(id_perguntas)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE;

    --------------- SQL ---------------

ALTER TABLE public.itens_correcao
  ADD COLUMN resposta VARCHAR;

  --------------- SQL ---------------

ALTER TABLE public.itens_correcao
  ALTER COLUMN id_correcao SET NOT NULL;

  --------------- SQL ---------------

ALTER TABLE public.itens_correcao
  RENAME COLUMN id_pergutas TO id_perguntas;
--------------- SQL ---------------

CREATE VIEW vs_resposta_correcao
AS
SELECT 
  respostas.id_perguntas,
  respostas.descricao,
  CASE 
    WHEN itens_correcao.id_resposta = respostas.id_respostas
      THEN 'S' ::text
    ELSE  'N' ::text
  END AS selecao,
  respostas.correta,
  itens_correcao.id_correcao,
  respostas.id_respostas
FROM
  respostas
  INNER JOIN itens_correcao ON (respostas.id_perguntas = itens_correcao.id_perguntas)

UNION

SELECT 
  itens_correcao.id_perguntas,
  itens_correcao.resposta AS descricao,
  '' ::text AS selecao,
  'S' ::character AS correta,
  itens_correcao.id_correcao,
  respostas.id_respostas
FROM
  itens_correcao
  LEFT OUTER JOIN respostas ON (itens_correcao.id_resposta = respostas.id_respostas)
WHERE
  itens_correcao.id_resposta IS NULL;
  --------------- SQL ---------------

CREATE VIEW vs_nota
AS
SELECT 
  public.itens_correcao.id_correcao,
  public.itens_correcao.id_perguntas,
  public.correcao.id_profissional,
    public.itens_avaliacoes.id_avaliacoes,
  public.itens_avaliacoes.nota_pergunta
FROM
  public.itens_correcao
  INNER JOIN public.correcao ON (public.itens_correcao.id_correcao = public.correcao.id_correcao)
  INNER JOIN public.respostas ON (public.itens_correcao.id_resposta = public.respostas.id_respostas)
  INNER JOIN public.itens_avaliacoes ON (public.respostas.id_perguntas = public.itens_avaliacoes.id_perguntas)
  AND (public.correcao.id_avaliacao = public.itens_avaliacoes.id_avaliacoes)
WHERE
  correta = 'S';

  --------------- SQL ---------------

Drop VIEW vs_nota;
CREATE VIEW vs_nota
AS
SELECT 
  itens_correcao.id_correcao,
  itens_correcao.id_perguntas,
  correcao.id_profissional,
  itens_avaliacoes.id_avaliacoes,
case when  respostas.correta = 'S' then   itens_avaliacoes.nota_pergunta else 0 end as nota_pergunta
FROM
  itens_correcao
  INNER JOIN correcao ON (itens_correcao.id_correcao = correcao.id_correcao)
  INNER JOIN respostas ON (itens_correcao.id_resposta = respostas.id_respostas)
  INNER JOIN itens_avaliacoes ON (respostas.id_perguntas = itens_avaliacoes.id_perguntas)
  AND (correcao.id_avaliacao = itens_avaliacoes.id_avaliacoes);

--------------- SQL ---------------

CREATE VIEW vs_nota_profissional
AS
  SELECT 
  public.avaliacoes.titulo,
  public.profissional.nome_completo,
	notas.nota,
    correcao.data_correcao,
    correcao.id_profissional
FROM
  public.avaliacoes
  INNER JOIN public.correcao ON (public.avaliacoes.id_avaliacoes = public.correcao.id_avaliacao)
  INNER JOIN public.profissional on (public.profissional.id_profissional=public.correcao.id_profissional)
  INNER JOIN (
  select sum(vs_nota.nota_pergunta) as nota,vs_nota.id_correcao from vs_nota 
  GROUP by vs_nota.id_profissional,vs_nota.id_correcao)
   notas ON (public.correcao.id_correcao = notas.id_correcao)
WHERE
  public.correcao.situacao = 'C';
--------------- SQL ---------------
CREATE OR REPLACE VIEW public.vs_nota_profissional(
    titulo,
    nome_completo,
    nota,
    data_correcao,
    id_profissional,
    id_departamento,
    desc_partamento)
AS
  SELECT avaliacoes.titulo,
         profissional.nome_completo,
         notas.nota,
         correcao.data_correcao,
         correcao.id_profissional,
         profissional.id_departamento,
         departamento.nome as desc_partamento
  FROM avaliacoes
       JOIN correcao ON avaliacoes.id_avaliacoes = correcao.id_avaliacao
       JOIN profissional ON profissional.id_profissional =
         correcao.id_profissional
         left join departamento ON departamento.id_departamento=profissional.id_departamento
left JOIN 
       (SELECT 
  public.correcao.id_profissional,
  sum(public.itens_correcao.nota) AS nota,
  public.correcao.id_correcao
FROM
  public.correcao
  INNER JOIN public.itens_correcao ON (public.correcao.id_correcao = public.itens_correcao.id_correcao)
WHERE
  public.correcao.situacao = 'C'
GROUP BY
  public.correcao.id_profissional,
  public.correcao.id_correcao
       ) notas ON correcao.id_correcao = notas.id_correcao
  WHERE correcao.situacao::text = 'C'::text;