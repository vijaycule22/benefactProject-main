USE [BENEF_MASTER_LOANS]
GO

/****** Object:  Table [BENEF_MASTER_SCHEMA_LOANS].[USER_DETAILS_INFO]    Script Date: 03-12-2022 21:39:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [BENEF_MASTER_SCHEMA_LOANS].[BENEFACT_USER_DETAILS_TBL](	
	[EMPOLYEE_ID] [varchar](32) NOT NULL,	
	[FIREST_NAME] [varchar](32) NOT NULL,
	[LAST_NAME] [varchar](32) NOT NULL,
	[DOJ] [datetime] NULL,
	[PASSHASH] [varchar](50) NOT NULL,
	[USER_TYPE] [int] NOT NULL,
	[EMAIL] [varchar](32) NULL,
	[MOBILE_NUMBER] [varchar](32) NULL,
PRIMARY KEY CLUSTERED 
(	
	[EMPOLYEE_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

