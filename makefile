#!/usr/bin/make -f
# Copyright (C) 2020 Antti Helminen
# This program is free software; you can redistribute
# it and/or modify it under the terms of the GNU
# General Public License

################################
# System configuration
################################
SHELL = /bin/sh

################################
# Project files
################################
PROG_NAME 		= Checklist

builddir 		= ./build/
publicdir		= ./public/
srcdir			= ./src/

################################
# Targets
################################

SRCS 			:= $(notdir $(wildcard $(srcdir)*))
OBJS			:= $(addprefix $(builddir),$(SRCS))

.PHONY: all build clean

################################
# Make
################################

all: build

build: $(OBJS)
	@echo [BUILD DONE]

$(builddir)%: $(srcdir)%
	@echo [BUILDING SOURCE]
	minifier -i $< -wo $@

clean:
	rm -f $(builddir)*