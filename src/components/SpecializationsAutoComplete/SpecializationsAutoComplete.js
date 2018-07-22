import React from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import css from './SpecializationsAutoComplete.scss'

class SpecializationsAutoComplete extends React.Component {
    static propTypes = {
      dataSource: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.String,
        value: PropTypes.String,
      })),
      onChange: PropTypes.func,
      placeholder: PropTypes.string,
    }

    static defaultProps = {
      dataSource: [],
      placeholder:"",
    }

    state = {
      value: '',
    }

    handleSuggestionsFetchRequested = () => {
    };

    handleSuggestionsClearRequested = () => {
    };

    handleChange = (event, { newValue }) => {
      this.setState({
        value: newValue,
      })
    };

    getDataSourceValue = (textValue) => {
      return this.props.dataSource.find(item => item.name === textValue)
    }

    getSuggestions = (value) => {
      const inputValue = value.trim().toLowerCase()
      const inputLength = inputValue.length
      let count = 0

      return inputLength === 0
        ? []
        : this.props.dataSource.filter(suggestion => {
          const keep =
                    count < 5 && suggestion.name.toLowerCase().slice(0, inputLength) === inputValue

          if (keep) {
            count += 1
          }

          return keep
        })
    }

    getSuggestionValue = (suggestion) => {
      let value = this.getDataSourceValue(suggestion.label)
      if (value) {
        this.props.onChange(value)
      }
      return suggestion.label
    }

    renderSuggestion = (suggestion, { query, isHighlighted }) => {
      const matches = match(suggestion.label, query)
      const parts = parse(suggestion.label, matches)

      return (
        <MenuItem selected={isHighlighted} component='div'>
          <div>
            {parts.map((part, index) => {
              return part.highlight ? (
                <span key={String(index)} style={{ fontWeight: 300 }}>
                  {part.text}
                </span>
              ) : (
                <strong key={String(index)} style={{ fontWeight: 500 }}>
                  {part.text}
                </strong>
              )
            })}
          </div>
        </MenuItem>
      )
    }

    renderSuggestionsContainer = (options) => {
      const { containerProps, children } = options

      return (
        <Paper {...containerProps} square className={css.listItems}>
          {children}
        </Paper>
      )
    }

    renderInput = (inputProps) => {
      const { ref, ...other } = inputProps
      return (
        <TextField
          fullWidth
          InputProps={{
            inputRef: ref,
            css: {
              input: css.input,
            },
            ...other,
          }}
        />
      )
    }

    render () {
      const { placeholder } = this.props
      return (
        <Autosuggest
          theme={{
            container: css.container,
            suggestionsContainerOpen: css.suggestionsContainerOpen,
            suggestionsList: css.suggestionsList,
            suggestion: css.suggestion,
          }}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderInputComponent={this.renderInput}
          suggestions={this.props.dataSource.map(item => ({ label: item.name }))}
          renderSuggestionsContainer={this.renderSuggestionsContainer}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={{
            css,
            placeholder,
            value: this.state.value,
            onChange: this.handleChange,
          }}
        />
      )
    }
}

export default SpecializationsAutoComplete
